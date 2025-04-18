import { CommentRepository } from "domain/repositories/CommentRepository";
import { EditCommentDto } from "./dto/EditCommentDto";

export class EditCommentUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(dto: EditCommentDto): Promise<void> {
    const comment = await this.commentRepository.findById(dto.id);
    if (!comment) {
      throw new Error("댓글을 찾을 수 없습니다");
    }

    comment.content = dto.content;
    comment.updatedAt = new Date();

    await this.commentRepository.update(comment);
  }
}
