import { CommentRepository } from "domain/repositories/CommentRepository";
import { CommentListDto } from "./dto/CommentListDto";
import { RespondCommentDto } from "./dto/RespondCommentDto";

export class CommentListUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(planId: number): Promise<CommentListDto> {
    const comments = await this.commentRepository.findByPlanId(planId);

    const commentDto: RespondCommentDto[] = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      planId: comment.planId,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt ? comment.updatedAt.toISOString() : null,
      nickname: comment.nickname,
      profileImage: comment.profileImage ?? null,
    }));

    return { comments: commentDto };
  }
}
