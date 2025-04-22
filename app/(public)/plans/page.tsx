"use client";

import PlanCardList from "@/components/planCardList/PlanCardList";
import Pagination from "@/components/pagination/Pagination";
import SelectBasic from "@/components/selectBasic/selectBasic";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./plans.module.scss";
import Button from "@/components/button/Button";
import Image from "next/image";
import { useCategoryStore } from "stores/categoryStore";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PlanCardDto } from "application/usecases/plans/dto/PlanCardDto";

interface PlanListResult {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  plans: PlanCardDto[]; // 또는 Plan[]
}

const PlansPage = () => {
  // const keyword = "검색 키워드";
  // const resultCnt = 16;
  const { categoryOptions } = useCategoryStore();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [result, setResult] = useState<PlanListResult>({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    plans: [],
  });

  useEffect(() => {
    const fetchPlans = async () => {
      if (!keyword) {
        return;
      }

      const res = await fetch(
        `/api/plans?keyword=${encodeURIComponent(keyword)}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      setResult(data);
    };

    fetchPlans();
  }, [keyword]);

  return (
    <div className="main-container">
      <div className={styles["title-container"]}>
        <div className={styles["title"]}>{`🔍 "${keyword}" 검색 결과`}</div>
        <span
          className={styles["sub-title"]}
        >{`검색 결과 ${result.totalCount}건`}</span>
      </div>

      <div className={styles["search-container"]}>
        <SearchInput />
      </div>

      {result.totalCount > 0 ? (
        <>
          <div className={styles["category-container"]}>
            <div className={styles["category-wrapper"]}>
              <SelectBasic
                option={categoryOptions.duration.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                placeholder={"기간"}
              />
              <SelectBasic
                option={categoryOptions.budget.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                placeholder={"예산"}
              />
              <SelectBasic
                option={categoryOptions.location.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                placeholder={"지역"}
              />
              <SelectBasic
                option={categoryOptions.season.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                placeholder={"계절"}
              />
            </div>
            <Button size={"large"} label={"필터 적용"} type={"default"} />
          </div>
          <PlanCardList showTitle={false} plans={result.plans} />
          <Pagination totalPages={3} />
        </>
      ) : (
        <div className={styles["no-result-container"]}>
          <Image
            src={"/logos/char-error.svg"}
            alt="no result"
            width={140}
            height={100}
          />
          <div className={styles["no-result-text"]}>
            {`"${keyword}"와 관련된 계획을 찾지 못했어요.😢`}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
