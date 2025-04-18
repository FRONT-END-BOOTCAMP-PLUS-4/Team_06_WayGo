"use client";
import Image from "next/image";
import styles from "./rootHeader.module.scss";
import React, { useRef, useState } from "react";
import Link from "next/link";
import useOutsideClick from "hooks/useOutsideClick";
import Dropdown from "@/components/dropdown/Dropdown";

const RootHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileWrapperRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 드롭다운 닫기 커스텀 훅
  useOutsideClick(profileWrapperRef, () => setIsDropdownOpen(false));

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
      {isLoggedIn ? (
        <div ref={profileWrapperRef}>
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
            {isDropdownOpen && (
              <Dropdown
                items={[
                  { type: "link", label: "마이 프로필", href: "/member" },
                  {
                    type: "custom",
                    element: <div>로그아웃</div>,
                  },
                ]}
              />
            )}
          </button>
        </div>
      ) : (
        <Link href="/login" className={styles["login-link"]}>
          로그인/회원가입
        </Link>
      )}
    </header>
  );
};

export default RootHeader;
