import { Plan } from "domain/entities/Plan";
import { PlanFilterDto } from "application/usecases/plans/dto/PlanFilterDto";

export interface PlanRepository {
  findAll(filter: PlanFilterDto): Promise<Plan[]>; // 필터 기반 목록 조회
  findById(id: number): Promise<Plan | null>;
<<<<<<< HEAD
  save(plan: Omit<Plan, "id" | "created_at">): Promise<Plan>;
=======
  findByIds(planIds: number[]): Promise<Plan[]>;
  save(plan: Plan): Promise<Plan>;
>>>>>>> b317f2fd610e6a321683573b756ca2c292e1ff13
  delete(id: number): Promise<void>;

  findPopularPlans(): Promise<Plan[]>; // 댓글 많은 순 인기 계획
  findCurrentSeasonPlans(): Promise<Plan[]>; // 계절별 큐레이션
}
