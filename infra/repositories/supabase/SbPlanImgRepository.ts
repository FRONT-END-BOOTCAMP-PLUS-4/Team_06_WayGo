import { PlanImgRepository } from "domain/repositories/PlanImgRepository";
import { PlanImgEntity } from "domain/entities/PlanImg";
import { SupabaseClient } from "@supabase/supabase-js";
import { AddPlanImgDto } from "application/usecases/planImg/dto/AddPlanImgDto";

export class SbPlanImgRepository implements PlanImgRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async addPlanImg(planImgDto: AddPlanImgDto): Promise<void> {
    const planImgData = {
      plan_id: planImgDto.planId,
      img_url: planImgDto.imgUrl,
      is_default: planImgDto.isDefault,
    };

    const { error } = await this.supabase.from("plan_img").insert(planImgData);

    if (error) {
      throw new Error(`Failed to add plan image: ${error.message}`);
    }
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

    // return data as PlanImgEntity | null;
    if (!data) {
      return null;
    }
    //PlanImgEntity에 맞게 변환
    return {
      id: data.id,
      planId: data.plan_id,
      imgUrl: data.img_url,
      isDefault: data.is_default,
    };
  }

  async createImage(image: Omit<PlanImgEntity, "id">): Promise<PlanImgEntity> {
    const imgData = {
      img_url: image.imgUrl,
      plan_id: image.planId,
    };
    const { data, error } = await this.supabase
      .from("plan_img")
      .insert(imgData)
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
