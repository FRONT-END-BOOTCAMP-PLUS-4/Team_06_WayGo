import { PlanRepository } from "domain/repositories/PlanRepository";
import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { EditPlanDto } from "./dto/EditPlanDto";
import { AddPlanImgDto } from "../planImg/dto/AddPlanImgDto";

export class EditPlanUsecase {
  constructor(
    private planRepository: PlanRepository,
    private planImgRepository: PlanImgRepository
  ) {}

  async execute(dto: EditPlanDto, images?: AddPlanImgDto[]): Promise<void> {
    const plan = await this.planRepository.findById(dto.id);
    if (!plan) {
      throw new Error("해당 여행 계획을 찾을 수 없습니다.");
    }

    // 수정 가능한 필드 업데이트
    if (dto.title !== undefined) {
      plan.title = dto.title;
    }
    if (dto.schedule !== undefined) {
      plan.schedule = dto.schedule;
    }
    if (dto.details !== undefined) {
      plan.details = dto.details;
    }
    if (dto.travelTips !== undefined) {
      plan.travel_tips = dto.travelTips;
    }
    if (dto.durationId !== undefined) {
      plan.duration_id = dto.durationId;
    }
    if (dto.locationId !== undefined) {
      plan.location_id = dto.locationId;
    }
    if (dto.budgetId !== undefined) {
      plan.budget_id = dto.budgetId;
    }
    if (dto.seasonId !== undefined) {
      plan.season_id = dto.seasonId;
    }

    plan.updated_at = new Date().toISOString();

    // Plan 업데이트
    await this.planRepository.save(plan);

    // 이미지 업데이트 처리 (옵션)
    if (images) {
      // 기존 이미지 삭제
      await this.planImgRepository.deleteByPlanId(dto.id);

      // 새 이미지 추가
      for (const image of images) {
        await this.planImgRepository.createImage({
          planId: dto.id,
          imgUrl: image.imgUrl,
          isDefault: image.isDefault,
        });
      }
    }
  }
}
