// /api/users/commented-plans/route.ts

import { NextResponse } from "next/server";
import { GetCommentedPlanListUsecase } from "application/usecases/comments/GetCommentedPlansUsecase";
import { SbCommentRepository } from "infra/repositories/supabase/SbCommentRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "userId가 없습니다." },
      { status: 400 }
    );
  }

  const usecase = new GetCommentedPlanListUsecase(new SbCommentRepository());
  const planIds = await usecase.execute(userId);

  return NextResponse.json({ planIds });
}
