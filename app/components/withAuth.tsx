"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const withAuth = (Component: React.ComponentType) => {
  return function ProtectedPage(props: any) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(true);
    const router = useRouter();

    useEffect(() => {
      // const token = localStorage.getItem("access_token");
      const token = isLoggedIn;
      setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
      if (isLoggedIn === false) {
        router.replace("/auth/login"); // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
      }
    }, [isLoggedIn]);

    if (isLoggedIn === null || isLoggedIn === false) {
      return null;
    } // 로딩 중이거나 비회원이면 아무것도 렌더링 안 함

    return <Component {...props} />; // 로그인 되어 있으면 실제 페이지 렌더링
  };
};
