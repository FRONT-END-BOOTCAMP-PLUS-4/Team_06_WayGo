import { PlanRepository } from "domain/repositories/PlanRepository";
import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { CommentRepository } from "domain/repositories/CommentRepository";
import { CommentedPlanCardDto } from "./dto/CommentedPlanCardDto";
export class GetPlanCardsUsecase {
  constructor(
    private planRepository: PlanRepository,
    private planImgRepository: PlanImgRepository,
    private commentRepository: CommentRepository // ✅ 추가
  ) {}

  async execute(
    planIds: number[],
    userId: string
  ): Promise<CommentedPlanCardDto[]> {
    const plans = await this.planRepository.findByIds(planIds);
    const comments = await this.commentRepository.findLatestCommentsByPlanIds(
      userId,
      planIds
    );

    const planCards = await Promise.all(
      plans.map(async (plan) => {
        const defaultImage = await this.planImgRepository.findDefaultByPlanId(
          plan.id!
        );
        const comment = comments.find((c) => c.planId === plan.id);

        return {
          id: plan.id!,
          title: plan.title,
          coverImage: defaultImage?.imgUrl ?? "/images/jeju.jpg",
          commentContent: comment?.content ?? "", // ✅ 댓글 주입
        };
      })
    );

    return planCards;
  }
}
