import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

interface PaymentRequest {
  billingKey: string;
  orderName: string;
  amount: number;
  customer: {
    id: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();

    // 요청 데이터 검증
    if (!body.billingKey || !body.orderName || !body.amount || !body.customer?.id) {
      return NextResponse.json(
        { success: false, error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Portone API Secret 확인
    const portoneApiSecret = process.env.PORTONE_API_SECRET;
    if (!portoneApiSecret) {
      return NextResponse.json(
        { success: false, error: "Portone API Secret이 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // paymentId 생성
    const paymentId = `payment-${v4()}`;

    // Portone V2 API 호출
    const portoneResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}/billing-key`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${portoneApiSecret}`,
        },
        body: JSON.stringify({
          billingKey: body.billingKey,
          orderName: body.orderName,
          amount: {
            total: body.amount,
          },
          customer: {
            id: body.customer.id,
          },
          currency: "KRW",
        }),
      }
    );

    if (!portoneResponse.ok) {
      const errorData = await portoneResponse.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: errorData.message || "결제 요청에 실패했습니다." },
        { status: portoneResponse.status }
      );
    }

    // 성공 응답 반환
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("결제 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

