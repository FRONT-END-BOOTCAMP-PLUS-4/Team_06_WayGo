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
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;
