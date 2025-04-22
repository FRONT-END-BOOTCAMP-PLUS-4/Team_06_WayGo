import { NextResponse } from "next/server";
import { SbBudgetRepository } from "infra/repositories/supabase/SbBudgetRepository";
import { BudgetListUsecase } from "application/usecases/budget/BudgetListUsecase";

// ✅ GET /api/budgets
export async function GET() {
  try {
    const budgetRepository = new SbBudgetRepository(); // Supabase 연결된 레포지토리
    const budgetListUsecase = new BudgetListUsecase(budgetRepository); // Usecase 준비

    const budgets = await budgetListUsecase.execute(); // 유즈케이스 실행해서 예산 목록 받아오기

    return NextResponse.json(budgets, { status: 200 }); // 성공 응답
  } catch (error) {
    console.error("예산 목록 조회 실패:", error);
    return NextResponse.json(
      { message: "예산 목록 조회 실패" },
      { status: 500 }
    ); // 에러 응답
  }
}
