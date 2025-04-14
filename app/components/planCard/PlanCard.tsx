"use client";

import React from "react";
import styles from "./planCard.module.css";

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
          <img src={image} alt={title} />
        </div>
      </div>
      <div className={styles.info}>
        <h3>{title}</h3>
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
