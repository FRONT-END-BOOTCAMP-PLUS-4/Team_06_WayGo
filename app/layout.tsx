"use client";

import "./globals.scss";
import RootHeader from "@/components/rootHeader/RootHeader";
import RootFooter from "@/components/rootFooter/RootFooter";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// 예시용 간단한 세션 훅 (실제로는 supabase나 쿠키 기반 훅으로 교체)
const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return { isLoggedIn };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useSession();

  const isPrivate = pathname.startsWith("/private");
  const isAuthPage = pathname.startsWith("/auth");
  const isPublicHome =
    pathname === "/" ||
    pathname.startsWith("/plans") ||
    pathname.startsWith("/users");

  const isPublic = isAuthPage || isPublicHome;

  useEffect(() => {
    if (isPrivate && !isLoggedIn) {
      router.replace("/auth/login");
    }
    if (isAuthPage && isLoggedIn) {
      router.replace("/private/plans");
    }
  }, [pathname, isLoggedIn]);

  const isBlocked = (isPrivate && !isLoggedIn) || (isAuthPage && isLoggedIn);

  if (isBlocked) {
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
