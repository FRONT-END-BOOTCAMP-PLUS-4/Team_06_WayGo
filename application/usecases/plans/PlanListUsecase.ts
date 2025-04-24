import { PlanRepository } from "domain/repositories/PlanRepository";
import { Plan } from "domain/entities/Plan";
import { PlanFilterDto } from "./dto/PlanFilterDto";

export class PlanListUsecase {
  constructor(private readonly planRepository: PlanRepository) {}

  async getPlans(filter: PlanFilterDto): Promise<Plan[]> {
    return await this.planRepository.findAll(filter);
  }

  async getPlansByPopular(): Promise<Plan[]> {
    return await this.planRepository.findPopularPlans();
  }
}
