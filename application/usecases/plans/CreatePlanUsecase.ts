import { PlanRepository } from "domain/repositories/PlanRepository";
import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { CreatePlanDto } from "./dto/CreatePlanDto";
import { AddPlanImgDto } from "../planImg/dto/AddPlanImgDto";
import { Plan } from "domain/entities/Plan";

export class CreatePlanUsecase {
  constructor(
    private planRepository: PlanRepository,
    private planImgRepository: PlanImgRepository
  ) {}

  async execute(dto: CreatePlanDto, images: AddPlanImgDto[]): Promise<Plan> {
    // Plan 생성
    const createdPlan = await this.planRepository.save(
      new Plan(
        dto.title,
        dto.schedule,
        dto.details,
        dto.travelTips,
        dto.userId,
        dto.durationId,
        dto.locationId,
        dto.budgetId,
        dto.seasonId
      )
    );

    // Plan 이미지 처리
    for (const image of images) {
      await this.planImgRepository.createImage({
        planId: createdPlan.id!,
        imgUrl: image.imgUrl,
        isDefault: image.isDefault,
      });
    }

    return createdPlan;
  }
}
