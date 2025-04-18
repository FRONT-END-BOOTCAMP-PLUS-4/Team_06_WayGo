import { PlanImgEntity } from "domain/entities/PlanImg";

export interface PlanImgRepository {
  findByPlanId(planId: number): Promise<PlanImgEntity[]>;
  findDefaultByPlanId(planId: number): Promise<PlanImgEntity | null>;
  createImage(image: Omit<PlanImgEntity, "id">): Promise<PlanImgEntity>;
  deleteById(id: number): Promise<void>;
  deleteByPlanId(planId: number): Promise<void>;
}
