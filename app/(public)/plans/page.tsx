import PlanCardList from "@/components/planCardList/PlanCardList";
import Pagination from "@/components/pagination/Pagination";
import SelectBasic from "@/components/selectBasic/selectBasic";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./plans.module.scss";

const PlansPage = () => {
  const keyword = "검색 키워드";
  const resultCnt = 16;

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
      <div className={styles["category-container"]}>
        <SelectBasic />
      </div>
      <PlanCardList />
      <Pagination totalPages={3} />
    </div>
  );
};

export default PlansPage;
