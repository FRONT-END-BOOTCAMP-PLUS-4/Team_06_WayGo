"use client";

import "./globals.scss";
import RootHeader from "@/components/rootHeader/RootHeader";
import RootFooter from "@/components/rootFooter/RootFooter";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CategoryResponse } from "application/usecases/plans/dto/CategoryListDto";
import { useCategoryStore } from "stores/categoryStore";

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
  const { isFetched, fetchCategoryOptions } = useCategoryStore();

  useEffect(() => {
    if (!isFetched) {
      fetchCategoryOptions();
    }
  }, [isFetched, fetchCategoryOptions]);

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
