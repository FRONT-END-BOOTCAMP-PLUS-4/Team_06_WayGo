"use client";
import Image from "next/image";
import styles from "./rootFooter.module.scss";
import React from "react";
import Link from "next/link";

const RootFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>© 2025 폭주뇽이. All Rights Reserved.</div>
      <ul>
        <li>개인정보처리방침</li>
        <li>
          <Link href="https://github.com/FRONT-END-BOOTCAMP-PLUS-4/Team_06_WayGo">
            <Image
              src="/icons/github-icon.svg"
              alt="GitHub 아이콘"
              width={16}
              height={16}
            />
            GitHub
          </Link>
        </li>
        <li>
          <Image
            src="/icons/email-icon.svg"
            alt="Email 아이콘"
            width={16}
            height={16}
          />
          문의하기
        </li>
      </ul>
    </footer>
  );
};

export default RootFooter;
