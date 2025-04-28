"use client";

import "./globals.scss";
import RootHeader from "@/components/rootHeader/RootHeader";
import RootFooter from "@/components/rootFooter/RootFooter";
import GlobalToast from "@/components/GlobalToast";
import { useEffect } from "react";
import { useCategoryStore } from "stores/categoryStore";
import { useAuthStore } from "stores/authStore";
import {
  useTokenExpirationDetector,
  useCookieChangeDetector,
} from "utils/authUtils";

// 쿠키에서 auth-storage 정보를 가져오는 함수
function getAuthFromCookie() {
  try {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth-storage=")
    );

    if (!authCookie) {
      return null;
    }

    const authData = JSON.parse(decodeURIComponent(authCookie.split("=")[1]));
    return authData;
  } catch (error) {
    console.error("쿠키 파싱 오류:", error);
    return null;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isFetched, fetchCategoryOptions } = useCategoryStore();
  const {
    setId,
    setEmail,
    setName,
    setNickname,
    setToken,
    setProfileImage,
    setCreatedAt,
    isAuthenticated,
  } = useAuthStore();

  // 토큰 만료 감지 훅 사용
  useTokenExpirationDetector();

  // 쿠키 변경 감지 훅 사용
  useCookieChangeDetector();

  // 페이지 로드 시 쿠키에서 인증 정보 로드 (zustand persist가 실패했을 경우의 백업)
  useEffect(() => {
    // zustand persist가 작동하지 않을 경우에만 쿠키에서 로드
    if (!isAuthenticated()) {
      const authData = getAuthFromCookie();

      if (authData && authData.token) {
        setToken(authData.token);

        // member 객체에서 사용자 정보 추출
        if (authData.member) {
          if (authData.member.id) {
            setId(authData.member.id);
          }
          if (authData.member.email) {
            setEmail(authData.member.email);
          }
          if (authData.member.name) {
            setName(authData.member.name);
          }
          if (authData.member.nickname) {
            setNickname(authData.member.nickname);
          }
          if (authData.member.profileImage) {
            setProfileImage(authData.member.profileImage);
          }
          if (authData.member.createdAt) {
            setCreatedAt(new Date(authData.member.createdAt));
          }
        }
      }
    }
  }, [
    isAuthenticated,
    setId,
    setEmail,
    setName,
    setNickname,
    setToken,
    setProfileImage,
    setCreatedAt,
  ]);

  useEffect(() => {
    if (!isFetched) {
      fetchCategoryOptions();
    }
  }, [isFetched, fetchCategoryOptions]);

  // 전역 인증 오류 이벤트 리스너 (API 요청 실패 시 발생)
  useEffect(() => {
    const handleUnauthorized = () => {
      console.log("인증 만료 이벤트 감지");
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <RootHeader />
        <GlobalToast />
        {children}
        <RootFooter />
      </body>
    </html>
  );
}
