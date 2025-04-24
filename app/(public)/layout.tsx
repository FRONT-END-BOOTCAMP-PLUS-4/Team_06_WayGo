"use client";

import { useAuthStore } from "stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  const { id } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 상태가 초기화되고 인증된 경우 로그인 페이지를 제외한 페이지 접근 시, 리다이렉트
    if (id && pathname !== "/login") {
      // 로그인한 사용자가 public/url 에 접속한 경우, member url 추가
      const memberPath = `/member${pathname}`;
      router.replace(memberPath); // 로그인된 사용자는 member 아래의 페이지로 리다이렉트
    }
  }, [id, router]);

  // 인증되지 않은 사용자만 public 라우트 접근 가능
  if (!id) {
    return <>{children}</>;
  }
}

export default PublicLayout;
