import { createClient } from "utils/supabase/server";
import { Season } from "domain/entities/Season";
import { SeasonRepository } from "domain/repositories/SeasonRepository";

export class SbSeasonRepository implements SeasonRepository {
  async findAll(): Promise<Season[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("season").select("id, content");

    if (error || !data) {
      throw new Error("계절 데이터를 불러올 수 없습니다.");
    }

    return data.map((item) => new Season(item.id, item.content));
  }
}
