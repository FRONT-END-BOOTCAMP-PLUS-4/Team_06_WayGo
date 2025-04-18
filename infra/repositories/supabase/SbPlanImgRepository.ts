import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { PlanImgEntity } from "domain/entities/PlanImg";
import { createClient } from "utils/supabase/server";

export class SbPlanImgRepository implements PlanImgRepository {
  private supabase;

  constructor() {
    this.supabase = createClient(); // server.ts의 createClient 사용
  }

  async findByPlanId(planId: number): Promise<PlanImgEntity[]> {
    const { data, error } = await this.supabase
      .from("plan_imgs")
      .select("*")
      .eq("plan_id", planId);

    if (error) {
      throw new Error(
        `Failed to fetch images for planId ${planId}: ${error.message}`
      );
    }

    return data as PlanImgEntity[];
  }

  async findDefaultByPlanId(planId: number): Promise<PlanImgEntity | null> {
    const { data, error } = await this.supabase
      .from("plan_img")
      .select("*")
      .eq("plan_id", planId)
      .eq("is_default", true)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(
        `Failed to fetch default image for planId ${planId}: ${error.message}`
      );
    }

    return data as PlanImgEntity | null;
  }

  async createImage(image: Omit<PlanImgEntity, "id">): Promise<PlanImgEntity> {
    const { data, error } = await this.supabase
      .from("plan_img")
      .insert(image)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create image: ${error.message}`);
    }

    return data as PlanImgEntity;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await this.supabase
      .from("plan_img")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete image with id ${id}: ${error.message}`);
    }
  }

  async deleteByPlanId(planId: number): Promise<void> {
    const { error } = await this.supabase
      .from("plan_img")
      .delete()
      .eq("plan_id", planId);

    if (error) {
      throw new Error(
        `Failed to delete images for planId ${planId}: ${error.message}`
      );
    }
  }
}
