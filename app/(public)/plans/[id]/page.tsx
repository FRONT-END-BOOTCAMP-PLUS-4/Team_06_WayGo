"use client";

import React, { useEffect, useState } from "react";
import Comments from "./components/comments/Comments";
import TravelPlanOverview from "./components/travelPlanOverview/TravelPlanOverview";
import TripGuide from "./components/tripGuide/TripGuide";
import styles from "./detail.module.scss";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = () => {
  const planId = Number(useParams().id);
  const [isLoading, setIsLoading] = useState(true);

  interface OverviewDataProps {
    user: { nickname: string };
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
        user: { nickname: planData?.user },
        createdAt: planData?.createdAt.split("T")[0],
        title: planData?.title,
        images: planData?.images,
        budget: planData?.budget.content,
        duration: planData?.duration.content,
        location: planData?.location.content,
        season: planData?.season.content,
      });

      setGuideData({
        schedule: DOMPurify.sanitize(planData?.schedule),
        details: DOMPurify.sanitize(planData?.details),
        travelTips: DOMPurify.sanitize(planData?.travelTips),
      });

      setIsLoading(false);
    } catch (error) {
      console.error("여행 계획 조회 실패: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("여행 계획 데이터", fetchPlanDetail(planId));
  }, [planId]);

  return (
    <div className="main-container">
      <div className={styles.pageContainer}>
        {isLoading ? (
          <div className={styles.overviewContainer}>
            <div style={{ textAlign: "center" }}>
              <ClipLoader color="#216c99" loading size={80} />
            </div>
          </div>
        ) : (
          <>
            <div className={styles.overviewContainer}>
              {overviewData && <TravelPlanOverview data={overviewData} />}
            </div>
            <div className={styles.guideContainer}>
              <TripGuide data={guideData || undefined} />
            </div>
            <div className={styles.commentsContainer}>
              <Comments planId={planId} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
