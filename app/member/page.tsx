"use client";

import PlanCardList from "@/components/planCardList/PlanCardList";
import styles from "./member.module.scss";
import React, { useEffect, useState } from "react";
import UserInfoCard from "@/member/components/userInfoCard/UserInfoCard";
import CommentCardList from "@/member/components/commentedCardList/CommentedCardList";

interface CommentedPlan {
  id: number;
  commentContent: string;
  title: string;
  imageUrl: string;
}

const MyProfile: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [planCards, setPlanCards] = useState<CommentedPlan[]>([]);

  const userInfo = {
    email: "test@waygo.com",
    nickname: "Test",
    profileImg: "/logos/char-success.svg",
  };

  // ✅ 현재 로그인한 유저 가져오기
  const fetchCurrentUser = async () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    }
  };

  const fetchCommentedPlanIds = async (userId: string) => {
    try {
      const params = new URLSearchParams({ userId });
      const res = await fetch(
        `/api/users/commented-plans?${params.toString()}`
      );
      if (!res.ok) {
        throw new Error("내 댓글이 달린 계획 가져오기 실패");
      }
      const { planIds } = await res.json();
      return planIds as number[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchPlanCards = async (planIds: number[], userId: string) => {
    if (planIds.length === 0) {
      setPlanCards([]);
      return;
    }

    try {
      const params = planIds.join(",");
      const res = await fetch(
        `/api/plans/commented?planIds=${params}&userId=${userId}`
      );
      if (!res.ok) {
        throw new Error("플랜 카드 조회 실패");
      }
      const data = await res.json();
      setPlanCards(data);
    } catch (error) {
      console.error(error);
      setPlanCards([]);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      (async () => {
        const planIds = await fetchCommentedPlanIds(currentUserId);
        await fetchPlanCards(planIds, currentUserId); // ✅ userId 넘겨줌
      })();
    }
  }, [currentUserId]);

  return (
    <div className="main-container">
      <h1 className={styles["my-profile-header"]}>🙋‍♂️ 마이 프로필</h1>
      <UserInfoCard userInfo={userInfo} />
      <PlanCardList isScrollAvailable={true} />
      <div className={styles["commented-card-section"]}>
        <h2>내 댓글이 달린 계획</h2>
        <CommentCardList data={planCards} />
      </div>
    </div>
  );
};

export default MyProfile;
