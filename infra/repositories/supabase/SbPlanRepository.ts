import { PlanRepository } from "domain/repositories/PlanRepository";
import { Plan } from "domain/entities/Plan";
import { createClient } from "utils/supabase/server";

export class SbPlanRepository implements PlanRepository {
  private supabase;

  constructor() {
    this.supabase = createClient(); // server.ts의 createClient 사용
  }

  async findAll(): Promise<Plan[]> {
    const { data, error } = await this.supabase.from("plans").select("*");

    if (error) {
      throw new Error(`Failed to fetch plans: ${error.message}`);
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

  async save(plan: Omit<Plan, "id" | "created_at">): Promise<Plan> {
    const { data, error } = await this.supabase
      .from("plans")
      .insert(plan)
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
