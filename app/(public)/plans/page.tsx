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
import { useRouter } from "next/navigation";
import { PlanCardDto } from "application/usecases/plans/dto/PlanCardDto";

interface PlanListResult {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  plans: PlanCardDto[];
}

const PlansPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { categoryOptions } = useCategoryStore();
  const searchParams = useSearchParams();
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | undefined>(
    Number(searchParams.get("budget")) || undefined
  );
  const [selectedLocationId, setSelectedLocationId] = useState<
    number | undefined
  >(Number(searchParams.get("location")) || undefined);
  const [selectedDurationId, setSelectedDurationId] = useState<
    number | undefined
  >(Number(searchParams.get("duration")) || undefined);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | undefined>(
    Number(searchParams.get("season")) || undefined
  );
  const keyword = searchParams.get("keyword") || "";
  const router = useRouter();
  const [result, setResult] = useState<PlanListResult>({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    plans: [],
  });

  const fetchPlans = async () => {
    const queryParams: Record<string, string> = {};
    if (keyword.trim()) {
      queryParams.keyword = encodeURIComponent(keyword);
    }
    if (selectedLocationId !== undefined) {
      queryParams.location = `${selectedLocationId}`;
    }
    if (selectedBudgetId !== undefined) {
      queryParams.budget = `${selectedBudgetId}`;
    }
    if (selectedDurationId !== undefined) {
      queryParams.duration = `${selectedDurationId}`;
    }
    if (selectedSeasonId !== undefined) {
      queryParams.season = `${selectedSeasonId}`;
    }

    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    try {
      const res = await fetch(`/api/plans?${queryString}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setResult(data);
      router.push(`/plans?${queryString}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [keyword]);

  const handleSearch = () => {
    if (!keyword.trim()) {
      return;
    }

    fetchPlans();
  };

  return (
    <div className="main-container">
      <div className={styles["title-container"]}>
        <div className={styles["title"]}>{`🔍 "${keyword}" 검색 결과`}</div>
        <span
          className={styles["sub-title"]}
        >{`검색 결과 ${result.totalCount}건`}</span>
      </div>

      <div className={styles["search-container"]}>
        <SearchInput currValue={keyword} />
      </div>

      {isLoading ? (
        <div className={styles["loader-container"]}>
          <div className={styles["loader"]}></div>
        </div>
      ) : result.totalCount > 0 ? (
        <>
          <div className={styles["category-container"]}>
            <div className={styles["category-wrapper"]}>
              <SelectBasic
                option={categoryOptions.duration.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                selectedValue={selectedDurationId}
                setSelectedValue={setSelectedDurationId}
                placeholder={"기간"}
              />
              <SelectBasic
                option={categoryOptions.budget.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                selectedValue={selectedBudgetId}
                setSelectedValue={setSelectedBudgetId}
                placeholder={"예산"}
              />
              <SelectBasic
                option={categoryOptions.location.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                selectedValue={selectedLocationId}
                setSelectedValue={setSelectedLocationId}
                placeholder={"지역"}
              />
              <SelectBasic
                option={categoryOptions.season.map((item) => ({
                  value: item.id,
                  title: item.content,
                }))}
                selectedValue={selectedSeasonId}
                setSelectedValue={setSelectedSeasonId}
                placeholder={"계절"}
              />
            </div>
            <Button
              size={"large"}
              label={"필터 적용"}
              type={"default"}
              onClick={handleSearch}
            />
          </div>
          <PlanCardList showTitle={false} plans={result.plans} />
          <Pagination
            totalPages={result.totalPages}
            currPage={result.currentPage}
          />
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
