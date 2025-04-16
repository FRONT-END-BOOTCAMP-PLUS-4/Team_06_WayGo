"use client";
import CommentedPlanCard from "@/(private)/my-profile/components/commentedPlanCard/CommentedPlanCard";
import styles from "./commentedCardList.module.scss";

interface CommentedCardProps {
  id: number;
  imageUrl: string;
  comment: string;
  title: string;
}

interface CommentedCardData {
  data: CommentedCardProps[];
}

const CommentCardList = ({ data }: CommentedCardData) => {
  const commentedCards = data.map((item) => (
    <CommentedPlanCard data={item} key={item.id} />
  ));

  console.log("리스트", data);
  return <ul className={styles["commented-plan-section"]}>{commentedCards}</ul>;
};

export default CommentCardList;
