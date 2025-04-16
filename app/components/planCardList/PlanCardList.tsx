"use client";

import PlanCard from "../planCard/PlanCard";
import styles from "./planCardList.module.scss";

const sectionTitle: string = "큐레이션 1";
const dummyData = [
  {
    id: 1,
    title: "제주도 3박 4일 힐링 여행",
    location: "제주도",
    period: "3박 4일",
    budget: "500,000원",
    season: "봄🌸",
    image: "/images/jeju.jpg",
  },
  {
    id: 2,
    title: "제주도 3박 4일 힐링 여행",
    location: "제주도",
    period: "3박 4일",
    budget: "500,000원",
    season: "봄🌸",
    image: "/images/jeju.jpg",
  },
  {
    id: 3,
    title: "제주도 3박 4일 힐링 여행",
    location: "제주도",
    period: "3박 4일",
    budget: "500,000원",
    season: "봄🌸",
    image: "/images/jeju.jpg",
  },
  {
    id: 4,
    title: "제주도 3박 4일 힐링 여행",
    location: "제주도",
    period: "3박 4일",
    budget: "500,000원",
    season: "봄🌸",
    image: "/images/jeju.jpg",
  },
];

const PlanCardList = ({ isScrollAvailable = false }) => {
  return (
    <div className={styles["card-section"]}>
      <div className={styles["section-title"]}>{sectionTitle}</div>
      <div
        className={`${isScrollAvailable ? styles["card-scroll"] : styles["card-grid"]}`}
      >
        {dummyData.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;
