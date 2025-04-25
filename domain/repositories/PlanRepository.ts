import { Plan } from "domain/entities/Plan";
import { PlanFilterDto } from "application/usecases/plans/dto/PlanFilterDto";

export interface PlanRepository {
  findAll(filter: PlanFilterDto): Promise<{
    totalCount: number;
    currentPage: number;
    totalPages: number;
    plans: Plan[];
  }>;
  findById(id: number): Promise<Plan | null>;
  save(plan: Omit<Plan, "id" | "created_at">): Promise<Plan>;
  findByIds(planIds: number[]): Promise<Plan[]>;
  delete(id: number): Promise<void>;

  findPopularPlans(): Promise<Plan[]>; // 댓글 많은 순 인기 계획
}
