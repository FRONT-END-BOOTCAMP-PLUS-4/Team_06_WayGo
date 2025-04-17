import { Comment } from "domain/entities/Comment";

export interface CommentRepository {
  findById(id: number): Promise<Comment | null>; // 댓글 단건 조회(수정, 삭제 시 필요)
  findByPlanId(planId: number): Promise<Comment[]>; // 특정 여행 계획에 대한 댓글 전체 조회
  create(comment: Comment): Promise<Comment>; // 댓글 생성
  update(comment: Comment): Promise<Comment>; // 댓글 수정
  delete(commentId: number): Promise<void>; // 댓글 삭제
  findPlanIdsByUserId(userId: string): Promise<number[]>; // 유저가 단 댓글의 planId 목록
}
// GET /api/users/:userId/commented-plans <--api 예시
