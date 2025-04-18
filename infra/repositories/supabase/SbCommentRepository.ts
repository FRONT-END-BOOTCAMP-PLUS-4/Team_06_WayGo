import { CommentRepository } from "domain/repositories/CommentRepository";
import { Comment } from "domain/entities/Comment";

export class SbCommentRepository implements CommentRepository {
  async findById(id: number): Promise<Comment | null> {
    // TODO: Supabase로 id 기반 댓글 조회
    throw new Error("Not implemented");
  }

  async findByPlanId(planId: number): Promise<Comment[]> {
    // TODO: Supabase로 특정 planId 댓글 목록 조회
    throw new Error("Not implemented");
  }

  async create(comment: Comment): Promise<Comment> {
    // TODO: Supabase로 댓글 저장
    throw new Error("Not implemented");
  }

  async update(comment: Comment): Promise<Comment> {
    // TODO: Supabase로 댓글 수정
    throw new Error("Not implemented");
  }

  async delete(commentId: number): Promise<void> {
    // TODO: Supabase로 댓글 삭제
    throw new Error("Not implemented");
  }

  async findPlanIdsByUserId(userId: string): Promise<number[]> {
    // TODO: Supabase로 유저가 댓글 단 planId 목록 조회
    throw new Error("Not implemented");
  }
}
