import { createClient } from "utils/supabase/server";
import { CommentRepository } from "domain/repositories/CommentRepository";
import { Comment } from "domain/entities/Comment";

type CommentTableRow = {
  id: number;
  content: string;
  created_at: string;
  updated_at?: string | null;
  user_id: string;
  plan_id: number;
  user: {
    nickname: string;
    profile_image?: string | null;
  }[]; // ✅ 배열임!!
};

export class SbCommentRepository implements CommentRepository {
  async findById(id: number): Promise<Comment | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        user_id,
        plan_id,
        user:nickname (nickname, profile_image)
      `
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("댓글 단건 조회 실패:", error);
      return null;
    }

    return this.toEntity(data);
  }

  async findByPlanId(planId: number): Promise<Comment[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        user_id,
        plan_id,
        user:users (nickname, profile_image)
      `
      )
      .eq("plan_id", planId)
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("댓글 목록 조회 실패:", error);
      return [];
    }

    return data.map(this.toEntity);
  }

  async create(comment: Comment): Promise<Comment> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .insert({
        content: comment.content,
        user_id: comment.userId,
        plan_id: comment.planId,
        created_at: comment.createdAt.toISOString(),
      })
      .select()
      .single();

    if (error || !data) {
      console.error("댓글 생성 실패:", error);
      throw new Error("댓글 생성 실패");
    }

    return this.toEntity(data);
  }

  async update(comment: Comment): Promise<Comment> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .update({
        content: comment.content,
        updated_at:
          comment.updatedAt?.toISOString() ?? new Date().toISOString(),
      })
      .eq("id", comment.id)
      .select()
      .single();

    if (error || !data) {
      console.error("댓글 수정 실패:", error);
      throw new Error("댓글 수정 실패");
    }

    return this.toEntity(data);
  }

  async delete(commentId: number): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("댓글 삭제 실패:", error);
      throw new Error("댓글 삭제 실패");
    }
  }

  async findPlanIdsByUserId(userId: string): Promise<number[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .select("plan_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("유저 댓글 플랜 조회 실패:", error);
      return [];
    }

    return data.map((row) => row.plan_id);
  }

  private toEntity(data: CommentTableRow): Comment {
    return new Comment(
      data.id,
      data.content,
      new Date(data.created_at),
      data.updated_at ? new Date(data.updated_at) : null,
      data.user?.[0]?.nickname ?? "", // ✅ 배열이니까 첫 번째 요소 접근
      data.user_id,
      data.plan_id,
      undefined,
      data.user?.[0]?.profile_image ?? undefined
    );
  }
}
