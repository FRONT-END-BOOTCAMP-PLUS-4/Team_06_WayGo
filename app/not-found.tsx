"use client";

import Image from "next/image";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className="main-container">
      <div className={styles["error-container"]}>
        <div className={styles["error-text"]}>
          {"요청하신 페이지를 찾지 못했어요 😭"}
        </div>
        <Image
          src={"/logos/char-error.svg"}
          alt="no result image"
          width={224}
          height={156}
        />
      </div>
    </main>
  );
}
