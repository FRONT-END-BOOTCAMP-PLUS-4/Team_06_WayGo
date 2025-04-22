import { BudgetRepository } from "domain/repositories/BudgetRepository";
import { BudgetListDto } from "./dto/BudgetListDto";
import { Budget } from "domain/entities/Budget";

export class BudgetListUsecase {
  constructor(private readonly BudgetRepository: BudgetRepository) {}

  async execute(): Promise<BudgetListDto[]> {
    const budgets: Budget[] = await this.BudgetRepository.findAll();

    return budgets.map((budget) => ({
      id: budget.id,
      content: budget.contents,
    }));
  }
}
