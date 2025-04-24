import { PlanRepository } from "domain/repositories/PlanRepository";
import { Plan } from "domain/entities/Plan";
import { PlanFilterDto } from "./dto/PlanFilterDto";
import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { PlanListDto } from "./dto/PlanListDto";
import { PlanCardDto } from "./dto/PlanCardDto";

export class PlanListUsecase {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly planImgRepository: PlanImgRepository
  ) {}

  async getPlans(filter: PlanFilterDto): Promise<PlanListDto> {
    const plans = await this.planRepository.findAll(filter);

    const enrichedPlans = (await Promise.all(
      plans.plans.map(async (plan) => {
        const defaultImage = await this.planImgRepository.findDefaultByPlanId(
          plan.id!
        );
        return {
          ...plan,
          userId: plan.user_id,
          imgUrl: defaultImage?.imgUrl ?? "/images/jeju.jpg",
        };
      })
    )) as PlanCardDto[];

    return {
      totalCount: plans.totalCount,
      currentPage: plans.currentPage,
      totalPages: plans.totalPages,
      plans: enrichedPlans,
    };
  }

  async getPlansByPopular(): Promise<Plan[]> {
    return await this.planRepository.findPopularPlans();
  }

  async getPlansBySeason(): Promise<Plan[]> {
    return await this.planRepository.findCurrentSeasonPlans();
  }
}
