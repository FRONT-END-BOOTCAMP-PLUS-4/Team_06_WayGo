"use client";

import Image from "next/image";
import PlanCardList from "@/components/planCardList/PlanCardList";
import Button from "@/components/button/Button";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingArea from "@/components/loadingArea/LoadingArea";

interface Plan {
  created_at: string;
}

export default function Home() {
  const router = useRouter();

  const [seasonList, setSeasonList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const month = new Date().getMonth() + 1;
  let currentSeasonId: number;
  let currentSeasonName: string;

  if ([3, 4, 5].includes(month)) {
    currentSeasonId = 1;
    currentSeasonName = "🌸 봄";
  } else if ([6, 7, 8].includes(month)) {
    currentSeasonId = 2;
    currentSeasonName = "🌊 여름";
  } else if ([9, 10, 11].includes(month)) {
    currentSeasonId = 3;
    currentSeasonName = "🍁 가을";
  } else {
    currentSeasonId = 4;
    currentSeasonName = "❄️ 겨울";
  }

  const fetchSeasonPlanList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/plans/season?seasonId=${currentSeasonId}`
      );

      const result = await response.json();
      const sortedSeasonList = result.data.plans.sort((a: Plan, b: Plan) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      console.log(sortedSeasonList);
      setSeasonList(sortedSeasonList);
      setIsLoading(false);
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
      {isLoading ? (
        <div className={styles["loading-area"]}>
          <LoadingArea />
        </div>
      ) : (
        <>
          <PlanCardList
            titleName={`${currentSeasonName}에 여행가요 🚌`}
            plans={seasonList}
            isScrollAvailable={true}
          />
          <PlanCardList />
        </>
      )}
    </div>
  );
}
