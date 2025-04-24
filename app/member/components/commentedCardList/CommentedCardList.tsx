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
  const commentedCards = data.map((item) => (
    <CommentedPlanCard data={item} key={item.id} />
  ));

  return <ul className={styles["commented-plan-section"]}>{commentedCards}</ul>;
};

export default CommentCardList;
