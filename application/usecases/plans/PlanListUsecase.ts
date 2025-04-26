import { PlanRepository } from "domain/repositories/PlanRepository";
import { Plan } from "domain/entities/Plan";
import { PlanFilterDto } from "./dto/PlanFilterDto";
import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { PlanListDto } from "./dto/PlanListDto";
import { PlanCardDto, planListToPlanCardDtoList } from "./dto/PlanCardDto";

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
          userId: plan.userId,
          imgUrl: defaultImage?.imgUrl ?? "/images/jeju.jpg",
          commentContent: "",
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

  async getPlansByPopular(): Promise<PlanListDto> {
    const { plans, totalCount, currentPage, totalPages } =
      await this.planRepository.findPopularPlans();

    const enrichedPlans = await Promise.all(
      plans.map(async (plan) => {
        const defaultImage = await this.planImgRepository.findDefaultByPlanId(
          plan.id!
        );

        return {
          id: plan.id!,
          title: plan.title,
          location: plan.location!,
          duration: plan.duration!,
          budget: plan.budget!,
          season: plan.season!,
          userId: plan.userId,
          imgUrl: defaultImage?.imgUrl ?? "/images/jeju.jpg",
          commentsCount: plan.commentsCount || 0,
          user: {
            nickname: plan.user?.nickname || "",
            profileImage: plan.user?.profileImage,
          },
        };
      })
    );

    return {
      plans: enrichedPlans,
      totalCount,
      currentPage,
      totalPages,
    };
  }

  async findAllByUserId(userId: string): Promise<PlanCardDto[]> {
    const plans = await this.planRepository.findAllByUserId(userId);
    return planListToPlanCardDtoList(plans);
  }
}
