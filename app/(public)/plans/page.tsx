"use client";

import PlanCardList from "@/components/planCardList/PlanCardList";
import Pagination from "@/components/pagination/Pagination";
import SelectBasic from "@/components/selectBasic/selectBasic";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./plans.module.scss";
import Button from "@/components/button/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CategoryResponse } from "application/usecases/plans/dto/CategoryListDto";

const CATEGORY_STORAGE_KEY = "categoryOptions";

const PlansPage = () => {
  const keyword = "검색 키워드";
  const resultCnt = 16;

  const [categoryOptions, setCategoryOptions] = useState<CategoryResponse>({
    season: [],
    duration: [],
    budget: [],
    location: [],
  });

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const stored = localStorage.getItem(CATEGORY_STORAGE_KEY);

        if (stored) {
          const parsed: CategoryResponse = JSON.parse(stored);
          setCategoryOptions(parsed);
          return;
        }

        //localStorage에 category 없다면 API 요청
        const res = await fetch("/api/category");
        if (!res.ok) {
          throw new Error("카테고리 데이터를 불러오지 못했습니다.");
        }

        const data: CategoryResponse = await res.json();
        setCategoryOptions(data);
        localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.error("카테고리 데이터 fetch 실패:", err);
      }
    };

    fetchCategoryOptions();
  }, []);

  return (
    <div className="main-container">
      <div className={styles["title-container"]}>
        <div className={styles["title"]}>{`🔍 "${keyword}" 검색 결과`}</div>
        <span
          className={styles["sub-title"]}
        >{`검색 결과 ${resultCnt}건`}</span>
      </div>

      <div className={styles["search-container"]}>
        <SearchInput />
      </div>

      {resultCnt > 0 ? (
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
          <PlanCardList showTitle={false} />
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
