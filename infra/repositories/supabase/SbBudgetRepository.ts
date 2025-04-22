import { createClient } from "utils/supabase/server";
import { Budget } from "domain/entities/Budget";
import { BudgetRepository } from "domain/repositories/BudgetRepository";
export class SbBudgetRepository implements BudgetRepository {
  async findAll(): Promise<Budget[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("budget")
      .select("id, contents");

    if (error || !data) {
      throw new Error("예산 데이터를 불러올 수 없습니다.");
    }

    return data.map((item) => new Budget(item.id, item.contents));
  }
}
