import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import { supabase } from "@/lib/supabase-client";

interface SubscriptionRequest {
  payment_id: string;
  status: "Paid" | "Cancelled";
}

interface PortonePaymentResponse {
  paymentId: string;
  billingKey?: string;
  orderName?: string;
  amount?: {
    total: number;
  };
  customer?: {
    id: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionRequest = await request.json();

    // 요청 데이터 검증
    if (!body.payment_id || !body.status) {
      return NextResponse.json(
        { success: false, error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // status가 "Paid"가 아닌 경우 성공 응답만 반환
    if (body.status !== "Paid") {
      return NextResponse.json({ success: true });
    }

    // Portone API Secret 확인
    const portoneApiSecret = process.env.PORTONE_API_SECRET;
    if (!portoneApiSecret) {
      return NextResponse.json(
        { success: false, error: "Portone API Secret이 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 2-1) paymentId의 결제정보를 조회
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(body.payment_id)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${portoneApiSecret}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "결제 정보 조회에 실패했습니다.",
        },
        { status: paymentResponse.status }
      );
    }

    const paymentData: PortonePaymentResponse = await paymentResponse.json();

    // 결제 정보 검증
    if (
      !paymentData.billingKey ||
      !paymentData.orderName ||
      !paymentData.amount?.total ||
      !paymentData.customer?.id
    ) {
      return NextResponse.json(
        { success: false, error: "결제 정보가 불완전합니다." },
        { status: 400 }
      );
    }

    // 현재 시각
    const now = new Date();
    const nowISO = now.toISOString();

    // end_at: 현재시각 + 30일
    const endAt = new Date(now);
    endAt.setDate(endAt.getDate() + 30);
    const endAtISO = endAt.toISOString();

    // end_grace_at: 현재시각 + 31일
    const endGraceAt = new Date(now);
    endGraceAt.setDate(endGraceAt.getDate() + 31);
    const endGraceAtISO = endGraceAt.toISOString();

    // next_schedule_at: end_at + 1일 오전 10시~11시 사이 임의 시각
    const nextScheduleBase = new Date(endAt);
    nextScheduleBase.setDate(nextScheduleBase.getDate() + 1);
    nextScheduleBase.setHours(10, 0, 0, 0); // 오전 10시
    // 10시~11시 사이 임의 시각 (0~60분 랜덤)
    const randomMinutes = Math.floor(Math.random() * 60);
    nextScheduleBase.setMinutes(randomMinutes);
    const nextScheduleAtISO = nextScheduleBase.toISOString();

    // next_schedule_id: UUID 생성 (동기화되는 값)
    const nextScheduleId = v4();

    // 2-1) supabase의 payment 테이블에 등록
    const { error: insertError } = await supabase.from("payment").insert({
      transaction_key: paymentData.paymentId,
      amount: paymentData.amount.total,
      status: "Paid",
      start_at: nowISO,
      end_at: endAtISO,
      end_grace_at: endGraceAtISO,
      next_schedule_at: nextScheduleAtISO,
      next_schedule_id: nextScheduleId,
    });

    if (insertError) {
      console.error("Supabase insert 오류:", insertError);
      return NextResponse.json(
        { success: false, error: "결제 정보 저장에 실패했습니다." },
        { status: 500 }
      );
    }

    // 3-1) 포트원에 다음달 구독결제 예약
    const scheduleResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(nextScheduleId)}/schedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${portoneApiSecret}`,
        },
        body: JSON.stringify({
          payment: {
            billingKey: paymentData.billingKey,
            orderName: paymentData.orderName,
            customer: {
              id: paymentData.customer.id,
            },
            amount: {
              total: paymentData.amount.total,
            },
            currency: "KRW",
          },
          timeToPay: nextScheduleAtISO,
        }),
      }
    );

    if (!scheduleResponse.ok) {
      const errorData = await scheduleResponse.json().catch(() => ({}));
      console.error("구독 예약 오류:", errorData);
      // 구독 예약 실패해도 결제는 완료되었으므로 성공으로 처리
      // 또는 실패로 처리할 수도 있음 (요구사항에 명시되지 않음)
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "구독 예약에 실패했습니다.",
        },
        { status: scheduleResponse.status }
      );
    }

    // 성공 응답 반환
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("구독 결제 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

