import PlanCardList from "@/components/planCardList/PlanCardList";
import Pagination from "@/components/pagination/Pagination";
import SelectBasic from "@/components/selectBasic/selectBasic";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./plans.module.scss";
import Button from "@/components/button/Button";
import Image from "next/image";

const PlansPage = () => {
  const keyword = "검색 키워드";
  const resultCnt = 16;

  const durationOptionList = [
    { value: 1, title: "당일치기" },
    { value: 2, title: "1박2일" },
    { value: 3, title: "2박3일" },
    { value: 4, title: "3박4일~" },
  ];

  const seasonOptionList = [
    { value: 1, title: "봄 🌸" },
    { value: 2, title: "여름 🤿" },
    { value: 3, title: "가을 🍁" },
    { value: 4, title: "겨울 ❄️" },
  ];

  const locationOptionList = [
    { value: 1, title: "수도권" },
    { value: 2, title: "강원권" },
    { value: 3, title: "충청권" },
    { value: 4, title: "호남권" },
    { value: 5, title: "경상권" },
    { value: 6, title: "제주권" },
  ];

  const budgetOptionList = [
    { value: 1, title: "~10만원" },
    { value: 2, title: "10~20만원" },
    { value: 3, title: "20~40만원" },
    { value: 4, title: "40만원~" },
  ];

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
              <SelectBasic option={durationOptionList} placeholder={"기간"} />
              <SelectBasic option={seasonOptionList} placeholder={"예산"} />
              <SelectBasic option={locationOptionList} placeholder={"지역"} />
              <SelectBasic option={budgetOptionList} placeholder={"계절"} />
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
          <div
            className={styles["no-result-text"]}
          >{`"${keyword}"와 관련된 계획을 찾지 못했어요.😢`}</div>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
