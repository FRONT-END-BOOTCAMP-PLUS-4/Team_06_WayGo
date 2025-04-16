"use client";
import Image from "next/image";
import Button from "@/components/button/Button";
import styles from "./commentedPlanCard.module.scss";
import { useRouter } from "next/navigation";

interface CommentedCardProps {
  imageUrl: string;
  comment: string;
  title: string;
}

interface CommentedCardData {
  data: CommentedCardProps;
}

const CommentedPlanCard = ({ data }: CommentedCardData) => {
  const router = useRouter();

  return (
    <li className={styles["commented-card"]}>
      <figure>
        <Image src={data.imageUrl} alt="여행 계획 이미지" fill />
      </figure>
      <div className={styles["commented-card-content"]}>
        <div>
          <p className={styles["user-comment"]}>{data.comment}</p>
          <p className={styles["plan-title"]}>{data.title}</p>
        </div>
        <Button
          type="lined"
          size="large"
          label="계획보기"
          onClick={() => {
            router.replace("/plans/1");
          }}
        />
      </div>
    </li>
  );
};

export default CommentedPlanCard;
