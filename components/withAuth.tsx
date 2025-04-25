"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "stores/authStore";
import { useToastStore } from "stores/toastStore";
import { useTokenExpirationDetector } from "utils/authUtils";

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
    const { isAuthenticated, clearAuth } = useAuthStore();
    const { showToast } = useToastStore();
    const router = useRouter();

    // 토큰 만료 감지 훅 사용
    useTokenExpirationDetector();

    useEffect(() => {
      // 인증 상태 확인
      if (!isAuthenticated()) {
        showToast("로그인이 필요한 페이지입니다.", "error");
        clearAuth();
        router.replace("/login");
      }
    }, [isAuthenticated, clearAuth, router, showToast]);

    // 인증 상태일 때만 컴포넌트 렌더링
    return isAuthenticated() ? <Component {...props} /> : null;
  };

  // displayName 설정 (디버깅 용이)
  const componentName = Component.displayName || Component.name || "Component";
  ProtectedComponent.displayName = `withAuth(${componentName})`;

  return ProtectedComponent;
};

export default withAuth;
