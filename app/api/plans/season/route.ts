import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { PlanListUsecase } from "application/usecases/plans/PlanListUsecase";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const seasonId = searchParams.get("seasonId");

    if (!seasonId) {
      return NextResponse.json(
        { success: false, message: "계절 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const planRepository = new SbPlanRepository(supabase);
    const planListUsecase = new PlanListUsecase(planRepository);

    // 해당 계절의 여행 계획을 최대 10개까지 조회
    const plans = await planListUsecase.getPlans({
      seasonId: Number(seasonId),
      limit: 10,
      orderBy: "created_at",
      orderDirection: "desc",
    });

    return NextResponse.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching seasonal plans:", error);
    return NextResponse.json(
      {
        success: false,
        message: "계절별 여행 계획 조회 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
