"use client";

import React from "react";
import Image from "next/image";
import styles from "./commentCard.module.scss";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import Dropdown from "@/components/dropdown/Dropdown";

const CommentCard: React.FC = () => {
  // 🔽 드롭다운이 열려 있는 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 🔽 드롭다운이 열려 있는 동안 외부 클릭을 감지하기 위한 DOM 참조 코드 추가
  const profileWrapperRef = useRef<HTMLDivElement>(null);

  // 🔽 바깥 클릭 시 드롭다운 닫기 (커스텀 훅)
  useOutsideClick(profileWrapperRef, () => setIsDropdownOpen(false));

  return (
    <div className={styles.commentCard}>
      <div className={styles.dropdown}>
        <div className={styles.dropdownWrapper} ref={profileWrapperRef}>
          <button
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Image
              src="/icons/more-icon.svg"
              alt="더 보기"
              width={16}
              height={16}
            />
            {isDropdownOpen && (
              <Dropdown
                top={20}
                items={[
                  { type: "custom", element: "수정" },
                  { type: "custom", element: "삭제" },
                ]}
              />
            )}
          </button>
        </div>
      </div>
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
