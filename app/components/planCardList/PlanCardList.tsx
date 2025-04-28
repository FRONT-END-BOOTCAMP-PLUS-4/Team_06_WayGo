"use client";

import PlanCard from "../planCard/PlanCard";
import styles from "./planCardList.module.scss";
import { PlanCardDto } from "application/usecases/plans/dto/PlanCardDto";

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
      {showTitle && <div className={styles["section-title"]}>{titleName}</div>}
      <div
        className={`${isScrollAvailable ? styles["card-scroll"] : styles["card-grid"]}`}
      >
        {plans.length > 0 ? (
          plans.map((plan) => (
            <PlanCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              location={
                typeof plan.location === "string"
                  ? plan.location
                  : plan.location.content
              }
              duration={
                typeof plan.duration === "string"
                  ? plan.duration
                  : plan.duration.content
              }
              budget={
                typeof plan.budget === "string"
                  ? plan.budget
                  : plan.budget.content
              }
              season={
                typeof plan.season === "string"
                  ? plan.season
                  : plan.season.content
              }
              imgUrl={plan.imgUrl || ""}
            />
          ))
        ) : (
          <div className={styles["no-plans"]}>
            아직 등록된 여행계획이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanCardList;
