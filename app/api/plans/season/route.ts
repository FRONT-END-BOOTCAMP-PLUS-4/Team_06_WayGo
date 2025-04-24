import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";
import { PlanListUsecase } from "application/usecases/plans/PlanListUsecase";
import { SbPlanImgRepository } from "infra/repositories/supabase/SbPlanImgRepository";

export async function GET(req: NextRequest) {
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
    const planImgRepository = new SbPlanImgRepository(supabase);
    const planListUsecase = new PlanListUsecase(
      planRepository,
      planImgRepository
    );

    const plansData = await planListUsecase.getPlans({
      seasonId: Number(seasonId),
      limit: 10,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          plans: plansData.plans,
          totalCount: plansData.totalCount,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("계절별 여행 계획 조회 실패:", error);
    return NextResponse.json(
      {
        success: false,
        message: "계절별 여행 계획 조회에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
