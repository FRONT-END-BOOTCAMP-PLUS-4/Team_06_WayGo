"use client";

import CommentedPlanCard from "@/member/components/commentedPlanCard/CommentedPlanCard";
import styles from "./commentedCardList.module.scss";

interface CommentedCardProps {
  id: number;
  imageUrl: string;
  commentContent: string;
  title: string;
}

interface CommentedCardData {
  data: CommentedCardProps[];
}

const CommentCardList = ({ data }: CommentedCardData) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles["commented-plan-section"]}>
        <div className={styles["no-comments"]}>
          아직 등록된 댓글이 없습니다.
        </div>
      </div>
    );
  }

  const commentedCards = data.map((item) => (
    <CommentedPlanCard data={item} key={item.id} />
  ));

  return <ul className={styles["commented-plan-section"]}>{commentedCards}</ul>;
};

export default CommentCardList;
