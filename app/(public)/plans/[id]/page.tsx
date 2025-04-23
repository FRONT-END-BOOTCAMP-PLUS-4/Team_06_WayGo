"use client";

import React, { useEffect, useState } from "react";
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

  interface OverviewDataProps {
    user: string;
    createdAt: string;
    title: string;
    images: string[];
    budget: string;
    duration: string;
    location: string;
    season: string;
  }

  interface GuideDataProps {
    schedule: string;
    details: string;
    travelTips: string;
  }

  const [overviewData, setOverviewData] = useState<OverviewDataProps | null>(
    null
  );
  const [guideData, setGuideData] = useState<GuideDataProps | null>(null);

  const fetchPlanDetail = async (id: number) => {
    try {
      const response = await fetch(`/api/plans/${id}`);

      if (!response.ok) {
        throw new Error("여행 계획 조회 실패");
      }

      const planDataResponse = await response.json();
      const planData = await planDataResponse.data;

      setOverviewData({
        user: planData?.user,
        createdAt: planData?.createdAt,
        title: planData?.title,
        images: planData?.images,
        budget: planData?.budget.content,
        duration: planData?.duration.content,
        location: planData?.location.content,
        season: planData?.season.content,
      });

      setGuideData({
        schedule: planData?.schedule,
        details: planData?.details,
        travelTips: planData?.travelTips,
      });
    } catch (error) {
      console.error("여행 계획 조회 실패: ", error);
    }
  };

  console.log("계획 id", planId);

  useEffect(() => {
    console.log("여행 계획 데이터", fetchPlanDetail(planId));
  }, [planId]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.overviewContainer}>
        <TravelPlanOverview data={overviewData} />
      </div>
      <div className={styles.guideContainer}>
        <TripGuide data={guideData} />
      </div>
      <div className={styles.commentsContainer}>
        <Comments planId={planId} />
      </div>
    </div>
  );
};

export default DetailPage;
