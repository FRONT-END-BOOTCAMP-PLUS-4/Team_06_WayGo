"use client";

import React from "react";
import Comments from "./components/comments/Comments";
import TravelPlanOverview from "./components/travelPlanOverview/TravelPlanOverview";
import TripGuide from "./components/tripGuide/TripGuide";
import styles from "./detail.module.scss";

const DetailPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.overviewContainer}>
        <TravelPlanOverview />
      </div>
      <div className={styles.guideContainer}>
        <TripGuide />
      </div>
      <div className={styles.commentsContainer}>
        <Comments />
      </div>
    </div>
  );
};
export default DetailPage;
