"use client";
import "./globals.scss";
import RootHeader from "@/components/rootHeader/RootHeader";
import RootFooter from "@/components/rootFooter/RootFooter";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { isLoggedIn } = useState(false);
  const router = useRouter();

  const isPrivate = pathname.startsWith("/private");
  const isPublic =
    pathname.startsWith("/auth") || pathname.startsWith("/public");

  useEffect(() => {
    // private 영역인데 로그인이 안 되어 있으면 → 로그인 페이지로
    if (isPrivate && !isLoggedIn) {
      router.replace("/auth/login");
    }

    // public 영역인데 로그인이 되어 있으면 → private 홈으로
    if (isPublic && isLoggedIn) {
      router.replace("/private/plans");
    }
  }, []);

  // 접근 제한 중에는 아무것도 렌더링하지 않음
  if ((isPrivate && !isLoggedIn) || (isPublic && isLoggedIn)) {
    return null;
  }

  return (
    <html lang="en">
      <body>
        <RootHeader />
        {children}
        <RootFooter />
      </body>
    </html>
  );
}
