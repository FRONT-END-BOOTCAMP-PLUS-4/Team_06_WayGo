"use client";
interface LayoutProps {
  children: React.ReactNode;
}

function MemberLayout({ children }: LayoutProps) {
  // 인증된 사용자의 경우 children 렌더링
  return <>{children}</>;
}

export default MemberLayout;
