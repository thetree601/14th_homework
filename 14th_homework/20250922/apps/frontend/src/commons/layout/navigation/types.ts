import React from "react";

export interface UserPoint {
  amount: number;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  userPoint?: UserPoint;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface NavigationProps {
  children?: React.ReactNode;
}
