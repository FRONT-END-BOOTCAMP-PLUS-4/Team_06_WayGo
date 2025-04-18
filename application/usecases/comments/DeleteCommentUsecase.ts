import { CommentRepository } from "domain/repositories/CommentRepository";
import { DeleteCommentDto } from "./dto/DeleteCommentDto";

export class DeleteCommentUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(dto: DeleteCommentDto): Promise<void> {
    const comment = await this.commentRepository.findById(dto.id);
    if (!comment) {
      throw new Error("댓글을 찾을 수 없습니다");
    }

    if (comment.userId !== dto.userId) {
      throw new Error("삭제 권한이 없습니다");
    }

    await this.commentRepository.delete(dto.id);
  }
}
