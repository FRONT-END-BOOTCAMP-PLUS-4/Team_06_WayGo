"use client";

import React from "react";
import styles from "./planCard.module.scss";
import Image from "next/image";
import Link from "next/link";

type PlanCardProps = {
  id: number;
  title: string;
  location: string;
  duration: string;
  budget: string;
  season: string;
  imgUrl: string;
};
const PlanCard = ({
  id,
  title,
  location,
  duration,
  budget,
  season,
  imgUrl,
}: PlanCardProps) => {
  return (
    <div key={id} className={styles.card}>
      <Link href={`/plans/${id}`} className={styles.link}>
        <div className={styles["image-area"]}>
          <div className={styles["image-area"]}>
            <span className={styles.season}>{season}</span>
            <Image src={imgUrl} alt={title} width={100} height={100} />
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <ul>
            <li>
              <strong>위치</strong> {location}
            </li>
            <li>
              <strong>기간</strong> {duration}
            </li>
            <li>
              <strong>예산</strong> {budget}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default PlanCard;
