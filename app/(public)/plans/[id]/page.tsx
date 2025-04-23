"use client";

import React from "react";
import Comments from "./components/comments/Comments";
import TravelPlanOverview from "./components/travelPlanOverview/TravelPlanOverview";
import TripGuide from "./components/tripGuide/TripGuide";
import styles from "./detail.module.scss";

interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const planId = Number(params.id);

  const fetchPlanDetail = async (id: number) => {
    try {
      const response = await fetch(`/api/plans/${id}`);

      console.log(response);

      if (!response.ok) {
        throw new Error("여행 계획 조회 실패");
      }

      const planDataResponse = await response.json();
      console.log(planDataResponse);
    } catch (error) {
      console.error("여행 계획 조회 실패: ", error);
    }
  };

  console.log("계획 id", planId);

  console.log("여행 계획 데이터", fetchPlanDetail(planId));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.overviewContainer}>
        <TravelPlanOverview />
      </div>
      <div className={styles.guideContainer}>
        <TripGuide />
      </div>
      <div className={styles.commentsContainer}>
        <Comments planId={planId} />
      </div>
    </div>
  );
};

export default DetailPage;
