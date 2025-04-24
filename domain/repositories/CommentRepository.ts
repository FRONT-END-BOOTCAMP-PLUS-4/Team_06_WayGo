import { Comment } from "domain/entities/Comment";

export interface CommentRepository {
  findById(id: number): Promise<Comment | null>; // 댓글 단건 조회(수정, 삭제 시 필요)
  findByPlanId(planId: number): Promise<Comment[]>; // 특정 여행 계획에 대한 댓글 전체 조회
  create(comment: Comment): Promise<Comment>;
  update(comment: Comment): Promise<Comment>;
  delete(commentId: number): Promise<void>;
  findPlanIdsByUserId(userId: string): Promise<number[]>; // 유저가 단 댓글의 planId 목록
  findLatestCommentsByPlanIds(
    userId: string,
    planIds: number[]
  ): Promise<{ planId: number; content: string; createdAt: string }[]>;
}
