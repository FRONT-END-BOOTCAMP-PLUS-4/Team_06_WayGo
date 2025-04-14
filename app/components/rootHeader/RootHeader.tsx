"use client";
import Image from "next/image";
import styles from "./rootHeader.module.scss";
import React, { useState } from "react";
import Link from "next/link";

const RootHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className={styles.header}>
      <Image
        src="/logos/logo-horizontal.svg"
        alt="웨이고 메인 로고"
        width={191.5}
        height={60}
      />
      {isLoggedIn ? (
        <div>
          <Link href="" className={styles["create-link"]}>
            내 계획 등록
          </Link>
          <Image
            src="/logos/char-success.svg"
            alt="User의 프로필 이미지"
            width={48}
            height={48}
            className={styles["user-profile"]}
          />
        </div>
      ) : (
        <Link href="" className={styles["login-link"]}>
          로그인/회원가입
        </Link>
      )}
    </header>
  );
};

export default RootHeader;
