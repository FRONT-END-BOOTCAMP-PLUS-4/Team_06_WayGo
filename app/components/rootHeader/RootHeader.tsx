"use client";
import Image from "next/image";
import styles from "./rootHeader.module.scss";
import React, { useRef, useState } from "react";
import Link from "next/link";
import useOutsideClick from "hooks/useOutsideClick";
import Dropdown from "@/components/dropdown/Dropdown";
import { useAuthStore } from "stores/authStore";
import { useToastStore } from "stores/toastStore";
import { usePathname, useRouter } from "next/navigation";

const RootHeader: React.FC = () => {
  const { id, clearAuth } = useAuthStore();
  const { showToast } = useToastStore();
  const pathname = usePathname();
  const router = useRouter();

  // 🔽 드롭다운이 열려 있는 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 🔽 드롭다운이 열려 있는 동안 외부 클릭을 감지하기 위한 DOM 참조 코드 추가
  const profileWrapperRef = useRef<HTMLDivElement>(null);

  // 🔽 바깥 클릭 시 드롭다운 닫기 (커스텀 훅)
  useOutsideClick(profileWrapperRef, () => setIsDropdownOpen(false));

  // 로그인 또는 회원가입 페이지인지 확인
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // 로그아웃 처리 함수
  const handleLogout = () => {
    try {
      // 쿠키 삭제
      document.cookie = `auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${
        window.location.hostname
      }; secure; samesite=strict;`;
      clearAuth();

      // router.replace를 사용하여 히스토리에 남기지 않고 홈으로 이동
      router.replace("/");

      // 로그아웃 성공 메시지 표시
      showToast("로그아웃되었습니다.", "success");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      showToast("로그아웃 처리 중 오류가 발생했습니다.", "error");
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logos/logo-horizontal.svg"
          alt="웨이고 메인 로고"
          width={191.5}
          height={60}
        />
      </Link>
      {id ? (
        <div ref={profileWrapperRef}>
          {/* 드롭다운 외부 클릭 감지를 위한 래퍼 DOM 요소 */}
          <Link href="/member/plans/create" className={styles["create-link"]}>
            내 계획 등록
          </Link>
          <button
            className={styles["user-profile"]}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Image
              src="/logos/char-success.svg"
              alt="User의 프로필 이미지"
              width={48}
              height={48}
            />
            {/* Dropdown 사용 방법:
                - type: "link" → Next.js <Link> 사용
                - type: "button" → onClick 핸들러 지정
                - type: "custom" → 자유롭게 ReactNode 삽입
            */}
            {isDropdownOpen && (
              <Dropdown
                items={[
                  { type: "link", label: "마이 프로필", href: "/member" },
                  {
                    type: "button",
                    label: "로그아웃",
                    onClick: handleLogout,
                  },
                ]}
              />
            )}
          </button>
        </div>
      ) : (
        // 로그인/회원가입 페이지가 아닐 때만 링크 표시
        !isAuthPage && (
          <Link href="/login" className={styles["login-link"]}>
            로그인/회원가입
          </Link>
        )
      )}
    </header>
  );
};

export default RootHeader;
