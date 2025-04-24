"use client";

import React, { useEffect, useState, useCallback } from "react";
import TextArea from "@/components/textArea/TextArea";
import Button from "@/components/button/Button";
import Pagination from "@/components/pagination/Pagination";
import CommentCard from "./commentCard/CommentCard";
import styles from "./comments.module.scss";
import { RespondCommentDto } from "application/usecases/comments/dto/RespondCommentDto";

interface CommentsProps {
  planId: number;
}

const Comments: React.FC<CommentsProps> = ({ planId }) => {
  const [comments, setComments] = useState<RespondCommentDto[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const commentsPerPage = 3;
  const isLoggedIn = !!currentUserId;

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // ✅ 로그인한 유저 정보 가져오기
  const fetchCurrentUser = async () => {
    /*
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        throw new Error("유저 정보 가져오기 실패");
      }
      const data = await res.json();
      setCurrentUserId(data.id);
    } catch (error) {
      console.error(error);
    }
      */

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    } else {
      console.error("userId 없음");
    }
  };

  // ✅ 댓글 불러오기
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?planId=${planId}`);
      if (!res.ok) {
        throw new Error("댓글 불러오기 실패");
      }
      const data = await res.json();
      const sortedComments = data.comments.sort(
        (a: RespondCommentDto, b: RespondCommentDto) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setComments(sortedComments);
    } catch (error) {
      console.error("댓글 가져오기 실패:", error);
    }
  }, [planId]);

  useEffect(() => {
    fetchCurrentUser();
    fetchComments();
  }, [fetchComments]);

  // ✅ 댓글 작성
  const handleAddComment = async () => {
    if (!commentInput.trim() || !currentUserId) {
      return;
    }
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentInput.trim(),
          planId,
          userId: currentUserId,
        }),
      });
      if (!res.ok) {
        throw new Error("댓글 작성 실패");
      }
      setCommentInput("");
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  // ✅ 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!currentUserId) {
      return;
    }
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
        }),
      });
      if (!res.ok) {
        throw new Error("댓글 삭제 실패");
      }
      // 댓글 삭제 후 상태 업데이트
      setComments((prevComments) => {
        const updatedComments = prevComments.filter((c) => c.id !== commentId);

        const lastPage =
          Math.ceil(updatedComments.length / commentsPerPage) || 1;
        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
        }

        return updatedComments;
      });
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  // ✅ 댓글 수정
  const handleEditComment = async (commentId: number, newContent: string) => {
    if (!currentUserId) {
      return;
    }
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newContent,
          userId: currentUserId,
        }),
      });
      if (!res.ok) {
        throw new Error("댓글 수정 실패");
      }
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.innerContainer}>
        {/* 상단: 댓글 수 */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>댓글 ({comments.length})</span>
        </div>

        {/* 입력창 + 버튼 */}
        <div className={styles.inputWrapper}>
          <TextArea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <div className={styles.buttonWrapper}>
            <Button
              label="댓글 작성"
              type={isLoggedIn ? "default" : "disabled"} // ✅ 이렇게 type으로 조절
              onClick={handleAddComment}
            />
          </div>
        </div>

        {/* 댓글 리스트 */}
        <div className={styles.commentList}>
          {currentComments.map((comment) => (
            <div key={comment.id} className={styles.commentCardWrapper}>
              <CommentCard
                id={comment.id}
                content={comment.content}
                nickname={comment.nickname}
                profileImage={comment.profileImage}
                createdAt={comment.createdAt}
                userId={comment.userId} // ✅ 댓글 작성자
                currentUserId={currentUserId}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment}
              />
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className={styles.paginationWrapper}>
          <Pagination
            totalPages={totalPages}
            onChangePage={setCurrentPage}
            currPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
