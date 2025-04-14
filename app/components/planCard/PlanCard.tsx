"use client";

import React from "react";
import styles from "./planCard.module.scss";
import Image from "next/image";

type PlanCardProps = {
  title: string;
  location: string;
  period: string;
  budget: string;
  season: string;
  image: string;
};

export default function PlanCard({
  title,
  location,
  period,
  budget,
  season,
  image,
}: PlanCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <div className={styles.imageArea}>
          <span className={styles.season}>{season}</span>
          <Image src={image} alt={title} width={100} height={100} />
        </div>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <ul>
          <li>
            <strong>위치</strong> {location}
          </li>
          <li>
            <strong>기간</strong> {period}
          </li>
          <li>
            <strong>예산</strong> {budget}
          </li>
        </ul>
      </div>
    </div>
  );
}
