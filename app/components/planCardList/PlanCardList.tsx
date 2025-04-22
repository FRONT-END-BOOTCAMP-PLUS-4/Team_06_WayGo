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
          {sectionTitle ?? titleName}
        </div>
      )}
      <div
        className={`${isScrollAvailable ? styles["card-scroll"] : styles["card-grid"]}`}
      >
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} image="/images/jeju.jpg" />
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;
