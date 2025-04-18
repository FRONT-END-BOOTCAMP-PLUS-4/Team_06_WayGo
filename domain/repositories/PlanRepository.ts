import { Plan } from "domain/entities/Plan";

export interface PlanRepository {
  findAll(): Promise<Plan[]>;
  findById(id: number): Promise<Plan | null>;
  save(plan: Plan): Promise<Plan>;
  delete(id: number): Promise<void>;
}
