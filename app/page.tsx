"use client";

import Image from "next/image";
import PlanCardList from "@/components/planCardList/PlanCardList";
import Button from "@/components/button/Button";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const seasonId = 1;

  const fetchSeasonPlanList = async () => {
    try {
      const response = await fetch("/api/plans/season?seasonId=2");

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("계절별 여행 목록 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchSeasonPlanList();
  }, []);

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
          <Button
            size={"medium"}
            label={"여행 계획 쓰기"}
            type={"default"}
            onClick={() => router.push("/member/plans/create")}
          />
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
