"use client";

import { useAuthStore } from "stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function MemberLayout({ children }: LayoutProps) {
  const { id } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 로그인되지 않은 경우 member 로 시작하는 페이지에 접속했을 때 login 페이지로 이동
    if (!id) {
      router.replace("/login");
    }
  }, [id, router]);

  // 인증된 사용자의 경우 children 렌더링
  return <>{children}</>;
}

export default MemberLayout;
