"use client";

import { useAuthStore } from "stores/authStore";
import { useToastStore } from "stores/toastStore";

// API 요청 기본 옵션
interface ApiOptions extends RequestInit {
  requireAuth?: boolean;
}

/**
 * API 요청 클라이언트
 * 인증 토큰 처리 및 에러 핸들링을 포함한 fetch 래퍼
 * @param url API 엔드포인트 경로
 * @param options fetch 옵션
 * @returns Response 객체
 */
export async function apiRequest(url: string, options: ApiOptions = {}) {
  const { requireAuth = false, ...fetchOptions } = options;
  const authStore = useAuthStore.getState();
  const toastStore = useToastStore.getState();

  // 기본 헤더 설정
  const headers = new Headers(fetchOptions.headers);

  // Content-Type이 설정되지 않았으면 기본값 설정
  if (
    !headers.has("Content-Type") &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // 인증이 필요한 요청이면 토큰 추가
  if (requireAuth && authStore.token) {
    headers.set("Authorization", `Bearer ${authStore.token}`);
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // 401 Unauthorized 처리
    if (response.status === 401) {
      authStore.clearAuth();
      toastStore.showToast(
        "인증이 만료되었습니다. 다시 로그인해 주세요.",
        "error"
      );

      // 이벤트 발생 (필요 시 미들웨어나 다른 컴포넌트에서 리스닝)
      const unauthorizedEvent = new CustomEvent("unauthorized");
      window.dispatchEvent(unauthorizedEvent);

      // 로그인 페이지로 이동 (location.href 사용으로 강제 리다이렉션)
      window.location.href = "/login?expired=true";
      throw new Error("인증이 만료되었습니다.");
    }

    // 네트워크 에러 외의 HTTP 에러 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
    }

    return response;
  } catch (error) {
    // 네트워크 요청 실패, 토큰 만료 외 오류 처리
    if (error instanceof Error && error.message !== "인증이 만료되었습니다.") {
      toastStore.showToast(
        error.message || "요청 처리 중 오류가 발생했습니다.",
        "error"
      );
    }
    throw error;
  }
}

/**
 * GET 요청 헬퍼 함수
 */
export function get(url: string, options: ApiOptions = {}) {
  return apiRequest(url, { ...options, method: "GET" });
}

/**
 * POST 요청 헬퍼 함수
 */
export function post(url: string, data: any, options: ApiOptions = {}) {
  return apiRequest(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT 요청 헬퍼 함수
 */
export function put(url: string, data: any, options: ApiOptions = {}) {
  return apiRequest(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 요청 헬퍼 함수
 */
export function del(url: string, options: ApiOptions = {}) {
  return apiRequest(url, { ...options, method: "DELETE" });
}
