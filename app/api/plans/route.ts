import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { PlanListUsecase } from "application/usecases/plans/PlanListUsecase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const repo = new SbPlanRepository(supabase);
  const usecase = new PlanListUsecase(repo);

  const { searchParams } = new URL(req.url);
  const filter = {
    keyword: searchParams.get("keyword") || undefined,
    budgetId: searchParams.get("budgetId")
      ? Number(searchParams.get("budgetId"))
      : undefined,
    locationId: searchParams.get("locationId")
      ? Number(searchParams.get("locationId"))
      : undefined,
    seasonId: searchParams.get("seasonId")
      ? Number(searchParams.get("seasonId"))
      : undefined,
    durationId: searchParams.get("durationId")
      ? Number(searchParams.get("durationId"))
      : undefined,
  };

  try {
    const result = await usecase.getPlans(filter);
    return NextResponse.json(result);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
