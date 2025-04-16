"use client";

import React, { useState } from "react";
import styles from "./tripGuide.module.scss";

type Tab = "schedule" | "details" | "tips";

const TripGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  const getContent = (tab: Tab) => {
    switch (tab) {
      case "schedule":
        return "제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은 제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은제주도 여행 일정: 오전 10시 제주국제공항 도착, 오전 11시 협재해수욕장 방문, 오후 2시 성산일출봉 관람 등 상세 일정은…";
      case "details":
        return "제주도 상세 정보: 기후, 맛집, 숙박, 교통 등의 정보를 제공합니다.";
      case "tips":
        return "제주도 여행 꿀팁: 할인 정보, 맛집 추천, 유용한 여행 팁들을 공유합니다.";
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
