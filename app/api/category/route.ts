import { NextResponse } from "next/server";

import { SbSeasonRepository } from "infra/repositories/supabase/SbSeasonRepository";
import { SbBudgetRepository } from "infra/repositories/supabase/SbBudgetRepository";
import { SbLocationRepository } from "infra/repositories/supabase/SbLocationRepository";
import { SbDurationRepository } from "infra/repositories/supabase/SbDurationRepository";

import { SeasonListUsecase } from "application/usecases/season/SeasonListUsecase";
import { BudgetListUsecase } from "application/usecases/budget/BudgetListUsecase";
import { LocationListUsecase } from "application/usecases/location/LocationListUsecase";
import { DurationListUsecase } from "application/usecases/duration/DurationListUsecase";

export async function GET() {
  try {
    const [seasonListDto, durationListDto, budgetListDto, locationListDto] =
      await Promise.all([
        new SeasonListUsecase(new SbSeasonRepository()).execute(),
        new DurationListUsecase(new SbDurationRepository()).execute(),
        new BudgetListUsecase(new SbBudgetRepository()).execute(),
        new LocationListUsecase(new SbLocationRepository()).execute(),
      ]);

    return NextResponse.json(
      {
        season: seasonListDto,
        duration: durationListDto,
        budget: budgetListDto,
        location: locationListDto,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("카테고리 목록 조회 오류:", error);
    return NextResponse.json(
      { error: "카테고리 목록 조회 실패" },
      { status: 500 }
    );
  }
}
