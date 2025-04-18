"use client";

import React from "react";
import Image from "next/image";
import styles from "./commentCard.module.scss";

const CommentCard: React.FC = () => {
  return (
    <div className={styles.commentCard}>
      {/* 댓글 내용 영역 */}
      <div className={styles.contentBox}>
        <div className={styles.leftSection}>
          <div className={styles.profileImage}>
            <Image
              src="/icons/camera-icon.svg"
              alt="프로필"
              width={48}
              height={48}
            />
          </div>
        </div>
        {/* 오른쪽 섹션: 닉네임, 날짜, 댓글 내용 */}
        <div className={styles.rightSection}>
          <div className={styles.header}>
            <span className={styles.nickname}>세월아네월아</span>
            <span className={styles.date}>2025.04.10</span>
          </div>
          <div className={styles.commentTextContainer}>
            <p className={styles.commentText}>
              정말 좋은 여행지입니다. 정말 좋은 여행지입니다. 제주도로 떠납니다.
              정말 좋은 여행지입니다. 제주도로 떠납니다. 정말 좋은 여행지입니다.
              제주도로 떠납니다. 정말 좋은 여행지입니다. 제주도로 떠납니다. 정말
              좋은 여행지입니다. 제주도로 떠납니다. 정말 좋은 여행지입니다.
              제주도로 떠납니다. 정말 좋은 여행지입니다. 제주도로 떠납니다. 정말
              좋은 여행지입니다. 제주도로 떠납니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
