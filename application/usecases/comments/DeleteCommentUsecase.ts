import { CommentRepository } from "domain/repositories/CommentRepository";

export class DeleteCommentUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
