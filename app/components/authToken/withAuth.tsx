"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "stores/authStore";
import { useToastStore } from "stores/toastStore";
import {
  useTokenExpirationDetector,
  useCookieChangeDetector,
} from "utils/authUtils";
import LoadingArea from "@/components/loadingArea/LoadingArea";

/**
 * 인증이 필요한 컴포넌트를 감싸는 고차 컴포넌트(HOC)
 * 인증되지 않은 사용자는 로그인 페이지로 리다이렉션
 * @param Component 인증이 필요한 컴포넌트
 * @returns 인증 상태를 확인하는 새 컴포넌트
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const ProtectedComponent = (props: P) => {
    const { isAuthenticated, token, id } = useAuthStore();
    const { showToast } = useToastStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    // 토큰 만료 감지 훅 사용
    useTokenExpirationDetector();

    // 쿠키 변경 감지 훅 사용
    useCookieChangeDetector();

    // 쿠키에서 직접 인증 상태 확인 함수
    const checkCookieAuth = () => {
      try {
        if (typeof window === "undefined") {
          return false;
        }

        const cookies = document.cookie.split(";");
        const authCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("auth-storage=")
        );

        if (!authCookie) {
          return false;
        }

        const authData = JSON.parse(
          decodeURIComponent(authCookie.split("=")[1])
        );
        // console.log("Auth cookie data:", authData);

        // zustand persist 형식
        if (authData.state && authData.state.token) {
          return true;
        }
        // 기존 API 응답 형식
        else if (authData.token) {
          return true;
        }

        return false;
      } catch (e) {
        console.error("쿠키 인증 확인 오류:", e);
        return false;
      }
    };

    useEffect(() => {
      // console.log("withAuth: 인증 체크 시작", {token, id, isAuthenticated: isAuthenticated()});

      // 컴포넌트 마운트 시 인증 상태 확인
      const checkAuth = () => {
        if (!isAuthenticated() && !checkCookieAuth()) {
          showToast("로그인이 필요한 페이지입니다.", "error");
          router.replace("/login");
          return false;
        }
        return true;
      };

      const isAuth = checkAuth();
      setIsLoading(!isAuth);
      setIsChecking(false);
    }, [token, id, isAuthenticated, router, showToast]);

    // 로딩 중이거나 인증 검사 중일 때는 LoadingArea 컴포넌트 반환
    if (isLoading || isChecking) {
      return <LoadingArea />;
    }

    // 인증 상태일 때만 컴포넌트 렌더링
    return <Component {...props} />;
  };

  // displayName 설정 (디버깅 용이)
  const componentName = Component.displayName || Component.name || "Component";
  ProtectedComponent.displayName = `withAuth(${componentName})`;

  return ProtectedComponent;
};

export default withAuth;
