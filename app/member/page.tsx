"use client";

import PlanCardList from "@/components/planCardList/PlanCardList";
import styles from "./member.module.scss";
import React, { useEffect, useState } from "react";
import UserInfoCard from "@/member/components/userInfoCard/UserInfoCard";
import CommentCardList from "@/member/components/commentedCardList/CommentedCardList";
import { useAuthStore } from "stores/authStore";
import withAuth from "@/components/authToken/withAuth";
import { PlanCardDto } from "application/usecases/plans/dto/PlanCardDto";
import LoadingArea from "@/components/loadingArea/LoadingArea";

interface CommentedPlan {
  id: number;
  commentContent: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
}

interface CommentedPlanApiResponse {
  id: number;
  title: string;
  coverImage: string;
  commentContent: string;
  createdAt: string;
}

const MyProfile: React.FC = () => {
  const [commentPlanCards, setCommentPlanCards] = useState<CommentedPlan[]>([]);
  const [myPlans, setMyPlans] = useState<PlanCardDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ zustand에서 로그인한 유저 정보 가져오기
  const { id: currentUserId, email, nickname, profileImage } = useAuthStore();

  // 내 여행계획 가져오기
  const fetchMyPlans = async (userId: string) => {
    if (!userId) {
      console.log("사용자 ID가 없어 여행계획을 가져올 수 없음");
      return;
    }

    try {
      console.log("내 여행계획 가져오기 시작:", userId);
      const response = await fetch(`/api/plans/member?userId=${userId}`);
      if (!response.ok) {
        throw new Error("내 여행계획 가져오기 실패");
      }
      const data = await response.json();
      console.log("받아온 내 여행계획 데이터:", data);

      // 데이터가 배열이 아니면 빈 배열로 설정
      if (!Array.isArray(data)) {
        console.error("데이터 형식이 배열이 아님:", data);
        setMyPlans([]);
        return;
      }

      setMyPlans(data);
    } catch (error) {
      console.error("내 여행계획 조회 실패:", error);
      setMyPlans([]);
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

  const fetchCommentPlanCards = async (planIds: number[], userId: string) => {
    if (planIds.length === 0) {
      setCommentPlanCards([]);
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
      setCommentPlanCards(
        data
          .map((item: CommentedPlanApiResponse) => ({
            id: item.id,
            title: item.title,
            imageUrl: item.coverImage,
            commentContent: item.commentContent,
            createdAt: new Date(item.createdAt),
          }))
          .sort(
            (a: CommentedPlan, b: CommentedPlan) =>
              b.createdAt.getTime() - a.createdAt.getTime()
          ) // 최신순 정렬
      );
    } catch (error) {
      console.error(error);
      setCommentPlanCards([]);
    }
  };

  useEffect(() => {
    console.log("현재 사용자 ID:", currentUserId);
    if (currentUserId) {
      (async () => {
        setIsLoading(true);
        // 내 여행계획 조회
        await fetchMyPlans(currentUserId);

        // 내 댓글이 달린 계획 조회
        const planIds = await fetchCommentedPlanIds(currentUserId);
        await fetchCommentPlanCards(planIds, currentUserId);
        setIsLoading(false);
      })();
    } else {
      console.log("사용자 ID가 없어 데이터를 불러올 수 없음");
      setIsLoading(false);
    }
  }, [currentUserId]);

  return (
    <div className="main-container">
      {isLoading ? (
        <LoadingArea />
      ) : (
        <>
          <h1 className={styles["my-profile-header"]}>🙋‍♂️ 마이 프로필</h1>

          <UserInfoCard
            userInfo={{
              email: email ?? "",
              nickname: nickname ?? "",
              profileImage: profileImage ?? "/logos/char-success.svg",
            }}
          />
          <PlanCardList
            isScrollAvailable={true}
            plans={myPlans}
            showTitle={true}
            titleName="내 여행계획"
          />
          <div className={styles["commented-card-section"]}>
            <h2>내 댓글이 달린 계획</h2>
            <CommentCardList data={commentPlanCards} />
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(MyProfile);
