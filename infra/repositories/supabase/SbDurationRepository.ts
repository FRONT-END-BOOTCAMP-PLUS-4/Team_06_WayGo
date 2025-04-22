import { createClient } from "utils/supabase/server";
import { BudgetRepository } from "domain/repositories/BudgetRepository";
import { Budget } from "domain/entities/Budget";

// Supabase용 BudgetRepository 구현체
export class SbBudgetRepository implements BudgetRepository {
  async findAll(): Promise<Budget[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("budget").select("id, content");

    if (error || !data) {
      console.error("예산 목록 가져오기 실패:", error);
      return [];
    }

    // Supabase에서 가져온 데이터를 Entity로 변환
    return data.map((budgetRow) => new Budget(budgetRow.id, budgetRow.content));
  }
}
