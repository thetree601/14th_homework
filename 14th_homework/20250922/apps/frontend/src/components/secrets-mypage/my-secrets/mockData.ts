import { Secret } from "@/components/secrets-list/types";

export const mySoldSecrets: Secret[] = [
  {
    id: 101,
    title: "내가 판매한 첫 번째 비밀",
    desc: "이 비밀은 정말 특별한 이야기입니다...",
    price: 15000,
    img: "/images/dog-1.jpg",
  },
  {
    id: 102,
    title: "두 번째 판매 비밀",
    desc: "아무도 모르는 그 곳의 진실",
    price: 20000,
    img: "/images/dog-2.jpg",
  },
  {
    id: 103,
    title: "세 번째 판매 비밀",
    desc: "시간이 지나도 잊을 수 없는",
    price: 12000,
    img: "/images/dog-3.jpg",
  },
];

export const myBoughtSecrets: Secret[] = [
  {
    id: 201,
    title: "내가 구매한 첫 번째 비밀",
    desc: "이 비밀을 알게 된 후 모든 게 달라졌다",
    price: 18000,
    img: "/images/dog-4.jpg",
  },
  {
    id: 202,
    title: "두 번째 구매 비밀",
    desc: "충격적인 진실이 담겨있다",
    price: 25000,
    img: "/images/dog-5.jpg",
  },
];

