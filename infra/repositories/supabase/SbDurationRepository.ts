import { createClient } from "utils/supabase/server";
import { Duration } from "domain/entities/Duration";
import { DurationRepository } from "domain/repositories/DurationRepository";

export class SbDurationRepository implements DurationRepository {
  async findAll(): Promise<Duration[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("duration")
      .select("id, content");

    if (error || !data) {
      throw new Error("기간 데이터를 불러올 수 없습니다.");
    }

    return data.map((item) => new Duration(item.id, item.content));
  }
}
