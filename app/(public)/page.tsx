"use client";

import Image from "next/image";
import PlanCardList from "@/components/planCardList/PlanCardList";
import Button from "@/components/button/Button";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./main.module.scss";

export default function Home() {
  return (
    <div className="main-container">
      <div className={styles["logo-container"]}>
        <Image
          src="/logos/logo-slogan.svg"
          alt="웹사이트 로고"
          width={240}
          height={160}
        />
        <div className={styles["button-wrapper"]}>
          <Button size={"medium"} label={"여행 계획 쓰기"} type={"default"} />
        </div>
      </div>
      <div className={styles["search-container"]}>
        <SearchInput />
      </div>
      <PlanCardList />
      <PlanCardList />
    </div>
  );
}
