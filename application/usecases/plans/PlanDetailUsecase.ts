import { PlanRepository } from "domain/repositories/PlanRepository";
import { PlanDetailDto } from "./dto/PlanDetailDto";

export class PlanDetailUsecase {
  constructor(private readonly planRepository: PlanRepository) {}

  async execute(planId: number): Promise<PlanDetailDto | null> {
    const plan = await this.planRepository.findById(planId);

    if (!plan) {
      return null;
    }

    // plan 객체를 PlanDetailDto 형식으로 변환
    const planDetail: PlanDetailDto = {
      id: plan.id!,
      title: plan.title,
      schedule: plan.schedule,
      details: plan.details,
      travelTips: plan.travelTips,
      createdAt: plan.createdAt!,
      updatedAt: plan.updatedAt!,
      deletedAt: plan.deletedAt!,
      user: plan.user!,
      duration: plan.duration!,
      location: plan.location!,
      budget: plan.budget!,
      season: plan.season!,
      images: plan.images || [],
    };

    return planDetail;
  }
}
