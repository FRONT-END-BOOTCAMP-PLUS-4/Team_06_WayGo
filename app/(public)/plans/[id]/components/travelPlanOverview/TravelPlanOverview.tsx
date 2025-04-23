"use client";

import React from "react";

import styles from "./travelPlanOverview.module.scss";
import OverviewCarousel from "./overviewCarousel/OverviewCarousel";

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

interface DataProps {
  data: OverviewDataProps;
}

const TravelPlanOverview = ({ data }: DataProps) => {
  console.log("개요 데이터: ", data);
  return (
    <div className={styles.overviewContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.carouselContainer}>
          <OverviewCarousel
            images={[
              "/images/jeju.jpg",
              "/images/yeosu.jpg",
              "/images/jeju.jpg",
              "/images/yeosu.jpg",
              "/images/jeju.jpg",
            ]}
          />
        </div>
      </div>

      {/* 오른쪽 영역: 600px */}
      <div className={styles.rightColumn}>
        <div className={styles.topContent}>
          <div className={styles.infoBoxes}>
            <div className={styles.boxHeader}>
              <div className={styles.author}>작성자명</div>
              <div className={styles.date}>2025.04.10</div>
            </div>

            <div className={styles.boxTitle}>제주도 가보자고.</div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>지역</div>
              <div className={styles.infoValue}>제주권</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>기간</div>
              <div className={styles.infoValue}>2박 3일</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>계절</div>
              <div className={styles.infoValue}>여름</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>예산</div>
              <div className={styles.infoValue}>20~40만원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanOverview;
