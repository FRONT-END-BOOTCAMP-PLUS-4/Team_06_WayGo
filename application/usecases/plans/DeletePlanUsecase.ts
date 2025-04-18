import { PlanRepository } from "domain/repositories/PlanRepository";
import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { DeletePlanDto } from "./dto/DeletePlanDto";

export class DeletePlanUsecase {
  constructor(
    private planRepository: PlanRepository,
    private planImgRepository: PlanImgRepository
  ) {}

  async execute(dto: DeletePlanDto): Promise<void> {
    const plan = await this.planRepository.findById(dto.id);
    if (!plan) {
      throw new Error("해당 여행 계획을 찾을 수 없습니다.");
    }

    // 관련 이미지 삭제
    await this.planImgRepository.deleteByPlanId(dto.id);

    // Plan 삭제
    await this.planRepository.delete(dto.id);
  }
}
