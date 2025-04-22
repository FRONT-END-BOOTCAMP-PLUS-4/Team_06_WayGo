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
