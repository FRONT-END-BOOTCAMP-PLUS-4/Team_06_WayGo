"use client";

import { withAuth } from "@/components/withAuth";

const ProtectedLayout = withAuth(function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // 여기서 하위 페이지들을 감싸서 보호함
});

export default ProtectedLayout;
