import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: "주문 관리 시스템",
  description: "MGO 주문 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="grid grid-cols-[1fr_462px]">
          <div className="w-full min-h-screen">
            {children}
          </div>
          <div className="w-[462px] min-h-screen border-l border-[rgba(0,27,55,0.1)]">
            <Navigation />
          </div>
        </div>
      </body>
    </html>
  );
}
