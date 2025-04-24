"use client";

import React from "react";

import styles from "./travelPlanOverview.module.scss";
import OverviewCarousel from "./overviewCarousel/OverviewCarousel";

interface OverviewDataProps {
  user: {
    nickname: string;
  };
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
  const imageList = data?.images.map((image) => {
    return image.imgUrl;
  });

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.carouselContainer}>
          <OverviewCarousel images={imageList} />
        </div>
      </div>

      {/* 오른쪽 영역: 600px */}
      <div className={styles.rightColumn}>
        <div className={styles.topContent}>
          <div className={styles.infoBoxes}>
            <div className={styles.boxHeader}>
              <div className={styles.author}>{data?.user.nickname}</div>
              <div className={styles.date}>{data?.createdAt}</div>
            </div>

            <div className={styles.boxTitle}>{data?.title}</div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>지역</div>
              <div className={styles.infoValue}>{data?.location}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>기간</div>
              <div className={styles.infoValue}>{data?.duration}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>계절</div>
              <div className={styles.infoValue}>{data?.season}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>예산</div>
              <div className={styles.infoValue}>{data?.budget}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanOverview;
