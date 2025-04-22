import { createClient } from "utils/supabase/server";
import { Location } from "domain/entities/Location";
import { LocationRepository } from "domain/repositories/LocationRepository";

export class SbLocationRepository implements LocationRepository {
  async findAll(): Promise<Location[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("location")
      .select("id, content");

    if (error || !data) {
      throw new Error("지역 데이터를 불러올 수 없습니다.");
    }

    return data.map((item) => new Location(item.id, item.content));
  }
}
