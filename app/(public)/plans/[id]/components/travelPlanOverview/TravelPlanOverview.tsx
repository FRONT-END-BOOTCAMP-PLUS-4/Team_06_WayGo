"use client";

import React from "react";

import styles from "./travelPlanOverview.module.scss";
import OverviewCarousel from "./overviewCarousel/OverviewCarousel";

const TravelPlanOverview: React.FC = () => {
  return (
    <div className={styles.overviewContainer}>
      {/* 왼쪽 영역: 600px */}
      <div className={styles.leftColumn}>
        {/* 대표 이미지 캐러셀: 가로세로 344px */}
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
