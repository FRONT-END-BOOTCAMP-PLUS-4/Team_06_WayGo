"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./overviewCarousel.module.scss";

interface OverviewCarouselProps {
  images: string[];
}

const OverviewCarousel: React.FC<OverviewCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // 대표 이미지로 선택된 이미지를 제외한 썸네일 이미지 목록을 생성합니다.
  // (만약 배열 길이가 5라면, 현재 대표 이미지가 1개 제외되어 썸네일은 최대 4개가 됩니다.)
  const thumbnailImages = images.filter((_, idx) => idx !== currentIndex);

  return (
    <div className={styles.carouselWrapper}>
      {/* 메인 캐러셀 영역 */}
      <div className={styles.carousel}>
        <button className={styles.arrowLeft} onClick={handlePrev}>
          <Image
            src="/icons/chevron-left-white.svg"
            alt="오른쪽 화살표"
            width={25}
            height={25}
          />
        </button>

        <div className={styles.imageWrapper}>
          <Image
            src={images[currentIndex]}
            alt={`대표 이미지 ${currentIndex + 1}`}
            fill={true}
          />
        </div>

        <button className={styles.arrowRight} onClick={handleNext}>
          <Image
            src="/icons/chevron-right-white.svg"
            alt="오른쪽 화살표"
            width={25}
            height={25}
          />
        </button>

        <div className={styles.indicator}>
          {currentIndex + 1} / {totalImages}
        </div>
      </div>

      <div className={styles.thumbnailRow}>
        {thumbnailImages.map((img, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              // 선택된 썸네일을 명확하게 표시: 여기서는 대표 이미지가 아닌 썸네일 목록이므로,

              // 예: index === currentIndex ? styles.activeThumbnail : ""
              ""
            }`}
            onClick={() => {
              // 클릭 시 해당 썸네일(원래 이미지 배열 상의 인덱스)을 대표 이미지로 변경
              // 현재 thumbnailImages는 대표 이미지를 제외한 배열이므로,
              // 원래 인덱스는 (index >= currentIndex ? index + 1 : index)로 계산할 수 있음
              const newIndex = index >= currentIndex ? index + 1 : index;
              setCurrentIndex(newIndex);
            }}
          >
            <Image
              src={img}
              alt={`썸네일 ${index + 1}`}
              width={78}
              height={78}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCarousel;
