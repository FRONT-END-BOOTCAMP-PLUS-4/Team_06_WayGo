"use client";

import React, { useState } from "react";
import parse from "html-react-parser";
import styles from "./tripGuide.module.scss";

type Tab = "schedule" | "details" | "tips";

interface GuideDataProps {
  schedule: string;
  details: string;
  travelTips: string;
}

interface DataProps {
  data?: GuideDataProps;
}

const TripGuide = ({ data }: DataProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  const getContent = (tab: Tab) => {
    switch (tab) {
      case "schedule":
        return parse(data?.schedule || "");
      case "details":
        return parse(data?.details || "");
      case "tips":
        return parse(data?.travelTips || "");
      default:
        return "";
    }
  };

  return (
    <div className={styles.tripGuideContainer}>
      {/* 탭 버튼들을 감싸는 영역 */}
      <div className={styles.tabButtonsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "schedule" ? styles.selected : ""
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          여행 일정
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "details" ? styles.selected : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          상세 정보
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tips" ? styles.selected : ""
          }`}
          onClick={() => setActiveTab("tips")}
        >
          여행 꿀팁
        </button>
      </div>

      <div className={styles.contentBox}>{getContent(activeTab)}</div>
    </div>
  );
};

export default TripGuide;
