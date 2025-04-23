"use client";

import { useAuthStore } from "stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  const { id, isRehydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 상태가 초기화되고 인증된 경우에는 리다이렉트
    if (!id === null && isRehydrated) {
      // 로그인한 사용자가 public/url 에 접속한 경우, member url 추가
      const memberPath = `/member${pathname}`;
      router.replace(memberPath); // 로그인된 사용자는 member 아래의 페이지로 리다이렉트
    }
  }, [id, isRehydrated, router]);

  // 상태가 초기화되지 않은 경우 아무것도 렌더링하지 않음
  if (!isRehydrated) {
    return null;
  }

  // 인증되지 않은 사용자만 public 라우트 접근 가능
  if (id === null) {
    return <>{children}</>;
  }

  // 인증된 사용자의 경우 리다이렉트 처리 중 빈 화면 표시
  return null;
}

export default PublicLayout;
