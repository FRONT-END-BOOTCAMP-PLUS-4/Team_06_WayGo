"use client";

import PlanCardList from "@/components/planCardList/PlanCardList";
import styles from "./myProfile.module.scss";
import React from "react";
import UserInfoCard from "@/(private)/my-profile/components/userInfoCard/UserInfoCard";
import CommentCardList from "@/(private)/my-profile/components/commentedCardList/CommentedCardList";

const MyProfile: React.FC = () => {
  const userInfo = {
    email: "test@waygo.com",
    nickname: "Test",
    profileImg: "/logos/char-success.svg",
  };

  const dummyData = [
    {
      id: 1,
      comment: "정말 멋진 여행이군요",
      title: "제주 3박 4일 일주 여행",
      imageUrl: "/images/jeju.jpg",
    },
    {
      id: 2,
      comment: "저도 저대로 따라갔더니 기가 막히더군요",
      title: "서울 한바퀴",
      imageUrl: "/images/jeju.jpg",
    },
  ];

  return (
    <div className="main-container">
      <h1 className={styles["my-profile-header"]}>🙋‍♂️ 마이 프로필</h1>
      <UserInfoCard userInfo={userInfo} />
      <PlanCardList isScrollAvailable={true} />
      <div className={styles["commented-card-section"]}>
        <h2>내 댓글이 달린 계획</h2>
        <CommentCardList data={dummyData} />
      </div>
    </div>
  );
};

export default MyProfile;
