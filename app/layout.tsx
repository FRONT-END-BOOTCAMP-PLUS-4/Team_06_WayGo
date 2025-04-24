"use client";

import "./globals.scss";
import RootHeader from "@/components/rootHeader/RootHeader";
import RootFooter from "@/components/rootFooter/RootFooter";
import GlobalToast from "@/components/GlobalToast";
import { useEffect } from "react";
import { useCategoryStore } from "stores/categoryStore";
import { useAuthStore } from "stores/authStore";

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
  const { setId, setEmail, setName, setNickname, setToken, setProfileImage } =
    useAuthStore();

  // 페이지 로드 시 쿠키에서 인증 정보 로드
  useEffect(() => {
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
      }
    }
  }, [setId, setEmail, setName, setNickname, setToken, setProfileImage]);

  useEffect(() => {
    if (!isFetched) {
      fetchCategoryOptions();
    }
  }, [isFetched, fetchCategoryOptions]);

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
