import { BudgetListDto } from "./dto/BudgetListDto";
import { BudgetRepository } from "domain/repositories/BudgetRepository";

export class BudgetListUsecase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute(): Promise<BudgetListDto[]> {
    const budgets = await this.budgetRepository.findAll();
    return budgets.map((budget) => ({
      id: budget.id,
      content: budget.contents,
    }));
  }
}
