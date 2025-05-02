"use client";

import React, { useActionState } from "react";

import styles from "./travelPlanOverview.module.scss";
import OverviewCarousel from "./overviewCarousel/OverviewCarousel";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "stores/authStore";

interface OverviewDataProps {
  user: {
    nickname: string;
    id: string;
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
  planId: number;
}

const TravelPlanOverview = ({ data, planId }: DataProps) => {
  const router = useRouter();
  const { id: userId } = useAuthStore();

  const imageList = data?.images.map((image) => {
    return image.imgUrl;
  });

  const handleToEdit = () => {
    router.push(`/member/plans/${planId}/edit`);
  };

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

            {data.user.id === userId && (
              <Button
                label="수정하기"
                size="full"
                type="lined"
                onClick={handleToEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanOverview;
