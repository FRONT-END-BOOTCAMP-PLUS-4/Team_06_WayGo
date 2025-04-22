import { createClient } from "utils/supabase/server";
import { DurationRepository } from "domain/repositories/DurationRepository";
import { Duration } from "domain/entities/Duration";

// Supabase용 DurationRepository 구현체
export class SbDurationRepository implements DurationRepository {
  async findAll(): Promise<Duration[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("duration")
      .select("id, content");

    if (error || !data) {
      console.error("기간 목록 가져오기 실패:", error);
      return [];
    }

    // Supabase에서 가져온 데이터를 Entity로 변환
    return data.map(
      (durationRow) => new Duration(durationRow.id, durationRow.content)
    );
  }
}
