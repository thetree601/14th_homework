import React from "react";
import Navigation from "./navigation/index";
import Banner from "./banner/index";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Banner />
      <main className="flex-grow container mx-auto">
        {children}
      </main>
      {/* 풋터는 필요시 추가 */}
    </div>
  );
}
