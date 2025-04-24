import { PlanRepository } from "domain/repositories/PlanRepository";
import { PlanFilterDto } from "application/usecases/plans/dto/PlanFilterDto";
import { Plan } from "domain/entities/Plan";
import { SupabaseClient } from "@supabase/supabase-js";

export class SbPlanRepository implements PlanRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findByIds(planIds: number[]): Promise<Plan[]> {
    const { data, error } = await this.supabase
      .from("plans")
      .select(
        `
        id,
        title,
        user_id
      `
      )
      .in("id", planIds);

    if (error || !data) {
      console.error("플랜 조회 실패", error);
      return [];
    }

    return data.map((row) => {
      return new Plan(row.title, "", "", "", row.user_id, 0, 0, 0, 0, row.id);
    });
  }

  async findAll(filter: PlanFilterDto): Promise<{
    totalCount: number;
    currentPage: number;
    totalPages: number;
    plans: Plan[];
  }> {
    const PAGE_SIZE = 16;
    const currentPage = filter.page ?? 1;
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = this.supabase
      .from("plans")
      .select(
        "*, duration:duration_id(id,content), season:season_id(id,content), location:location_id(id,content), budget:budget_id(id,content)",
        { count: "exact" }
      )
      .range(from, to)
      .is("deleted_at", null);

    if (filter.keyword) {
      query = query.ilike("title", `%${filter.keyword}%`);
    }
    if (filter.budgetId) {
      query = query.eq("budget_id", filter.budgetId);
    }
    if (filter.locationId) {
      query = query.eq("location_id", filter.locationId);
    }
    if (filter.seasonId) {
      query = query.eq("season_id", filter.seasonId);
    }
    if (filter.durationId) {
      query = query.eq("duration_id", filter.durationId);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch plans: ${error.message}`);
    }

    const totalCount = count ?? 0;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return {
      totalCount,
      currentPage,
      totalPages,
      plans: (data as any[]).map((plan) => ({
        ...plan,
        duration: plan.duration?.content ?? null,
        season: plan.season?.content ?? null,
        location: plan.location?.content ?? null,
        budget: plan.budget?.content ?? null,
      })),
    };
  }

  async findPopularPlans(): Promise<Plan[]> {
    const { data, error } = await this.supabase
      .from("plans")
      .select("*, comments(count)")
      .order("comments.count", { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(`Failed to fetch popular plans: ${error.message}`);
    }
    return (data as Plan[]).map((plan) => ({
      ...plan,
      duration: (plan.duration as any).content ?? null,
      season: (plan.duration as any).content ?? null,
      location: (plan.duration as any).content ?? null,
      budget: (plan.duration as any).content ?? null,
    }));

    // return data as Plan[];
  }

  async findCurrentSeasonPlans(): Promise<Plan[]> {
    const month = new Date().getMonth() + 1;
    let currentSeasonId: number;

    if ([3, 4, 5].includes(month)) {
      currentSeasonId = 1;
    } else if ([6, 7, 8].includes(month)) {
      currentSeasonId = 2;
    } else if ([9, 10, 11].includes(month)) {
      currentSeasonId = 3;
    } else {
      currentSeasonId = 4;
    }

    const { data, error } = await this.supabase
      .from("plans")
      .select("*")
      .eq("season_id", currentSeasonId)
      .is("deleted_at", null);

    if (error) {
      throw new Error(`Failed to fetch season plans: ${error.message}`);
    }

    return data as Plan[];
  }

  async findById(id: number): Promise<Plan | null> {
    const { data, error } = await this.supabase
      .from("plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to fetch plan with id ${id}: ${error.message}`);
    }

    return data as Plan | null;
  }

  async findByUserId(id: number): Promise<Plan | null> {
    const { data, error } = await this.supabase
      .from("plans")
      .select("*")
      .eq("user_id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to fetch plan with id ${id}: ${error.message}`);
    }

    return data as Plan | null;
  }

  async save(plan: Omit<Plan, "id" | "created_at">): Promise<Plan> {
    const planData = {
      title: plan.title,
      schedule: plan.schedule,
      details: plan.details,
      travel_tips: plan.travelTips,
      user_id: plan.userId,
      duration_id: plan.durationId,
      location_id: plan.locationId,
      budget_id: plan.budgetId,
      season_id: plan.seasonId,
    };

    const { data, error } = await this.supabase
      .from("plans")
      .insert(planData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save plan: ${error.message}`);
    }
    return data as Plan;
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabase.from("plans").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete plan with id ${id}: ${error.message}`);
    }
  }
}
