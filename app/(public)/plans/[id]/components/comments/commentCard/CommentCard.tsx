"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./commentCard.module.scss";
import useOutsideClick from "hooks/useOutsideClick";
import Dropdown from "@/components/dropdown/Dropdown";
import TextArea from "@/components/textArea/TextArea";
import Button from "@/components/button/Button";

interface CommentCardProps {
  id: number;
  content: string;
  nickname: string;
  profileImage?: string | null;
  createdAt: string;
  userId: string;
  currentUserId: string | null;
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, newContent: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  id,
  content,
  nickname,
  profileImage,
  createdAt,
  userId,
  currentUserId,
  onDelete,
  onEdit,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const profileWrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(profileWrapperRef, () => setIsDropdownOpen(false));

  const handleDelete = async () => {
    await onDelete(id);
  };

  const handleSaveEdit = async () => {
    if (editContent.trim()) {
      await onEdit(id, editContent.trim());
      setIsEditing(false);
    }
  };

  const validProfileImage =
    profileImage && profileImage.startsWith("http")
      ? profileImage
      : "/logos/char-success.svg";

  return (
    <div className={styles.commentCard}>
      {/* 작성자와 로그인한 유저가 같을 때만 드롭다운 노출 */}
      {currentUserId === userId && (
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
                    {
                      type: "custom",
                      element: (
                        <div
                          onClick={() => {
                            setIsEditing(true);
                            setIsDropdownOpen(false);
                          }}
                        >
                          수정
                        </div>
                      ),
                    },
                    {
                      type: "custom",
                      element: <div onClick={handleDelete}>삭제</div>,
                    },
                  ]}
                />
              )}
            </button>
          </div>
        </div>
      )}

      {/* 댓글 내용 */}
      <div className={styles.contentBox}>
        <div className={styles.leftSection}>
          <div className={styles.profileImage}>
            <Image
              src={validProfileImage}
              alt="프로필"
              width={56}
              height={56}
            />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.header}>
            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.date}>{createdAt.slice(0, 10)}</span>
          </div>

          <div className={styles.commentTextContainer}>
            {isEditing ? (
              <>
                <TextArea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="댓글을 수정하세요"
                />
                <div className={styles.buttonWrapper}>
                  <Button
                    label="댓글 수정"
                    type="default"
                    onClick={handleSaveEdit}
                  />
                </div>
              </>
            ) : (
              <p className={styles.commentText}>{content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
