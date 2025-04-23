"use client";

import { useAuthStore } from "stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function MemberLayout({ children }: LayoutProps) {
  const { id, isRehydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 로그인되지 않은 경우 member 로 시작하는 페이지에 접속했을 때 login 페이지로 이동
    if (id === null && isRehydrated) {
      router.replace("/login");
    }
  }, [id, isRehydrated, router]);

  // 상태가 초기화되지 않았거나 인증되지 않은 경우 아무것도 렌더링하지 않음
  if (!isRehydrated || !id) {
    return null;
  }

  // 인증된 사용자의 경우 children 렌더링
  return <>{children}</>;
}

export default MemberLayout;
