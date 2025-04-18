import { Budget } from "domain/entities/Budget";

export interface BudgetRepository {
  findAll(): Promise<Budget[]>;
}
