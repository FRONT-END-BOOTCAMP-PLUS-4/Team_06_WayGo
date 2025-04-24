import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { SbPlanRepository } from "infra/repositories/supabase/SbPlanRepository";

export async function GET() {
  const supabase = await createClient();
  const planRepository = new SbPlanRepository(supabase);

  try {
    const plans = await planRepository.findCurrentSeasonPlans();
    return NextResponse.json(plans);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
