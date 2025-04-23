"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ComponentType, ReactNode } from "react";
import { useAuthStore } from "stores/authStore";
import { isTokenValid } from "utils/jwt";

export const withAuth = <P extends {}>(Component: ComponentType<P>) => {
  return function ProtectedPage(props: P) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(true);
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
      // 클라이언트 사이드에서만 실행
      if (typeof window !== "undefined") {
        // 로컬 스토리지에서 토큰 획득
        const authStorage = localStorage.getItem("auth-storage");

        if (authStorage) {
          try {
            const authData = JSON.parse(authStorage);
            const token = authData.state?.token;

            // 토큰 유효성 검증
            const isValid = token ? isTokenValid(token) : false;

            setIsLoggedIn(isValid);

            // 토큰이 만료되었으면 로그인 페이지로 이동
            if (!isValid && token) {
              // zustand 스토어에서도 확인하여 이중 검증
              if (!isAuthenticated()) {
                router.replace("/login");
              }
            }
          } catch (e) {
            console.error("인증 데이터 파싱 오류:", e);
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      }
    }, [router, isAuthenticated]);

    useEffect(() => {
      if (isLoggedIn === false) {
        router.replace("/login"); // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
      }
    }, [isLoggedIn, router]);

    if (isLoggedIn === null || isLoggedIn === false) {
      return null;
    } // 로딩 중이거나 비회원이면 아무것도 렌더링 안 함

    return <Component {...props} />; // 로그인 되어 있으면 실제 페이지 렌더링
  };
};
