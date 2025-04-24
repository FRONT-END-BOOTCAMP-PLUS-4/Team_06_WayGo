"use client";

import PlanCard from "../planCard/PlanCard";
import styles from "./planCardList.module.scss";
import { PlanCardDto } from "application/usecases/plans/dto/PlanCardDto";

const sectionTitle: string = "큐레이션 1";

interface PlanCardListProps {
  showTitle?: boolean;
  titleName?: string;
  isScrollAvailable?: boolean;
  plans: PlanCardDto[];
}

const PlanCardList = ({
  showTitle = true,
  titleName = "",
  isScrollAvailable = false,
  plans = [],
}: PlanCardListProps) => {
  return (
    <div className={styles["card-section"]}>
      {showTitle && (
        <div className={styles["section-title"]}>
          {titleName || sectionTitle}
        </div>
      )}
      <div
        className={`${isScrollAvailable ? styles["card-scroll"] : styles["card-grid"]}`}
      >
        {plans.length === 0 ? (
          <div className={styles["no-plans"]}>등록된 여행 계획이 없습니다.</div>
        ) : (
          plans.map((plan) => (
            <PlanCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              location={
                typeof plan.location === "string"
                  ? plan.location
                  : plan.location?.content || ""
              }
              duration={
                typeof plan.duration === "string"
                  ? plan.duration
                  : plan.duration?.content || ""
              }
              budget={
                typeof plan.budget === "string"
                  ? plan.budget
                  : plan.budget?.content || ""
              }
              season={
                typeof plan.season === "string"
                  ? plan.season
                  : plan.season?.content || ""
              }
              imgUrl={plan.imgUrl || "/images/jeju.jpg"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PlanCardList;
