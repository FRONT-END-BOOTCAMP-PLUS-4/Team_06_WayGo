"use client";

import { useEffect } from "react";
import { useAuthStore } from "stores/authStore";
import { useToastStore } from "stores/toastStore";
import { isTokenValid } from "utils/jwt";
import { useRouter } from "next/navigation";

// 토큰 만료까지 남은 시간을 초 단위로 계산하는 함수
export function getTokenRemainingTime(token: string | null): number {
  if (!token) {
    return 0;
  }

  try {
    const payload = parseJwt(token);
    if (!payload.exp) {
      return 0;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(0, payload.exp - currentTime);
  } catch (error) {
    console.error("토큰 만료 시간 계산 오류:", error);
    return 0;
  }
}

// JWT 토큰 페이로드 추출 함수
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 파싱 오류:", error);
    return {};
  }
}

// 토큰 만료 감지 훅
export function useTokenExpirationDetector(warningThreshold = 20) {
  const { token, clearAuth, isAuthenticated } = useAuthStore();
  const { showToast } = useToastStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return;
    }

    // 처음 로드 시 토큰 유효성 검사
    if (!isAuthenticated()) {
      handleTokenExpired();
      return;
    }

    // 토큰 만료 감지를 위한 interval 설정
    const intervalId = setInterval(() => {
      const remainingTime = getTokenRemainingTime(token);

      // 토큰이 만료되었을 때
      if (remainingTime <= 0) {
        handleTokenExpired();
        clearInterval(intervalId);
      }
      // 토큰이 곧 만료될 때 (warningThreshold초 이내)
      else if (remainingTime <= warningThreshold) {
        showToast(
          `로그인 세션이 ${Math.floor(remainingTime)}초 후 만료됩니다.`,
          "info"
        );
      }
    }, 10000); // 10초마다 체크

    return () => clearInterval(intervalId);
  }, [token, clearAuth, showToast, router, isAuthenticated, warningThreshold]);

  // 토큰 만료 시 처리 함수
  const handleTokenExpired = () => {
    clearAuth();
    showToast("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.", "error");
    router.push("/login?expired=true");
  };
}
