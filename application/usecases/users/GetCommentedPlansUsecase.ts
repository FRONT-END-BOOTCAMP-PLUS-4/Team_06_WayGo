import { CommentRepository } from "domain/repositories/CommentRepository";

export class GetCommentedPlanListUsecase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(userId: string): Promise<number[]> {
    return await this.commentRepository.findPlanIdsByUserId(userId);
  }
}
