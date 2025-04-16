"use client";

import React, { useState } from "react";
import TextArea from "@/components/textArea/TextArea";
import Button from "@/components/button/Button";
import Pagination from "@/components/pagination/Pagination";
import CommentCard from "./commentCard/CommentCard";
import styles from "./comments.module.scss";

const Comments: React.FC = () => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>([
    "첫 번째 댓글입니다.",
    "두 번째 댓글입니다.",
    "세 번째 댓글입니다.",
    "네 번째 댓글입니다.",
    "다섯 번째 댓글입니다.",
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments((prev) => [...prev, commentInput.trim()]);
      setCommentInput("");
    }
  };

  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.innerContainer}>
        {/* 상단 헤더: 댓글 개수 */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>댓글 ({comments.length})</span>
        </div>
        {/* 텍스트 입력 및 댓글 작성 버튼 */}
        <div className={styles.inputWrapper}>
          <TextArea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <div className={styles.buttonWrapper}>
            <Button
              label="댓글 작성"
              type="default"
              onClick={handleAddComment}
            />
          </div>
        </div>
        {/* 작성된 댓글 리스트 */}
        <div className={styles.commentList}>
          {currentComments.map((c, idx) => (
            <div key={idx} className={styles.commentCardWrapper}>
              <CommentCard />
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className={styles.paginationWrapper}>
          <Pagination totalPages={totalPages} onChangePage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
