import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const planRepo = new SbPlanRepository(supabase);

    const plan = await planRepo.findById(Number(params.id));

    if (!plan) {
      return NextResponse.json(
        { message: "계획이 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error("플랜 조회 실패:", error);
    return NextResponse.json({ message: "플랜 조회 실패" }, { status: 500 });
  }
}
