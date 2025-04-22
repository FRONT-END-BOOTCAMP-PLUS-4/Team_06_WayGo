import { createClient } from "utils/supabase/server";
import { SeasonRepository } from "domain/repositories/SeasonRepository";
import { Season } from "domain/entities/Season";

// Supabase용 SeasonRepository 구현체
export class SbSeasonRepository implements SeasonRepository {
  async findAll(): Promise<Season[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("season").select("id, content");

    if (error || !data) {
      console.error("계절 목록 가져오기 실패:", error);
      return [];
    }

    // Supabase에서 가져온 데이터를 Entity로 변환
    return data.map((seasonRow) => new Season(seasonRow.id, seasonRow.content));
  }
}
