import { createClient } from "utils/supabase/server";
import { CommentRepository } from "domain/repositories/CommentRepository";
import { Comment } from "domain/entities/Comment";

// ✅ select 결과용 타입 따로 정의
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
  } | null;
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
        user:users!comment_user_id_fkey (nickname, profile_image)
      `
      )
      .eq("id", id)
      .single()
      .overrideTypes<CommentTableRow, { merge: false }>();

    if (error || !data) {
      console.error("댓글 단건 조회 실패:", error);
      return null;
    }

    return this.toEntity(data);
  }
  async findLatestCommentsByPlanIds(
    userId: string,
    planIds: number[]
  ): Promise<{ planId: number; content: string; createdAt: string }[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("comments")
      .select("plan_id, content, created_at")
      .eq("user_id", userId)
      .in("plan_id", planIds)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("최신 댓글 조회 실패:", error);
      return [];
    }

    const seen = new Set<number>();
    const unique: { planId: number; content: string; createdAt: string }[] = [];

    for (const row of data) {
      if (!seen.has(row.plan_id)) {
        seen.add(row.plan_id);
        unique.push({
          planId: row.plan_id,
          content: row.content,
          createdAt: row.created_at,
        });
      }
    }

    return unique;
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
        user:users!comment_user_id_fkey (nickname, profile_image)
      `
      )
      .eq("plan_id", planId)
      .order("created_at", { ascending: true })
      .overrideTypes<CommentTableRow[], { merge: false }>(); // ✅ overrideTypes 사용

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
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        user_id,
        plan_id,
        user:users!comment_user_id_fkey (nickname, profile_image)
      `
      )
      .single()
      .overrideTypes<CommentTableRow, { merge: false }>(); // ✅ overrideTypes 사용

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
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        user_id,
        plan_id,
        user:users!comment_user_id_fkey (nickname, profile_image)
      `
      )
      .single()
      .overrideTypes<CommentTableRow, { merge: false }>(); // ✅ overrideTypes 사용

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
      data.user?.nickname ?? "", //
      data.user_id,
      data.plan_id,
      undefined,
      data.user?.profile_image ?? undefined
    );
  }
}
