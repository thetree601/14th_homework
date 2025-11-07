import { PointTransaction } from "./index";

export const pointChargeHistory: PointTransaction[] = [
  {
    id: 1,
    amount: 50000,
    balance: 50000,
    createdAt: "2024-01-15T10:30:00",
    description: "신용카드 결제",
  },
  {
    id: 2,
    amount: 30000,
    balance: 80000,
    createdAt: "2024-01-20T14:20:00",
    description: "계좌이체",
  },
  {
    id: 3,
    amount: 100000,
    balance: 180000,
    createdAt: "2024-02-01T09:15:00",
    description: "신용카드 결제",
  },
];

export const pointPurchaseHistory: PointTransaction[] = [
  {
    id: 101,
    amount: 15000,
    balance: 165000,
    createdAt: "2024-02-05T11:45:00",
    description: "내가 판매한 첫 번째 비밀",
  },
  {
    id: 102,
    amount: 18000,
    balance: 147000,
    createdAt: "2024-02-10T16:20:00",
    description: "내가 구매한 첫 번째 비밀",
  },
  {
    id: 103,
    amount: 25000,
    balance: 122000,
    createdAt: "2024-02-15T13:30:00",
    description: "두 번째 구매 비밀",
  },
  {
    id: 104,
    amount: 12000,
    balance: 110000,
    createdAt: "2024-02-20T10:10:00",
    description: "세 번째 판매 비밀",
  },
];

