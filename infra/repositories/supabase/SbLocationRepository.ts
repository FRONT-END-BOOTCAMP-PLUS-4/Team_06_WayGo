import { createClient } from "utils/supabase/server";
import { LocationRepository } from "domain/repositories/LocationRepository";
import { Location } from "domain/entities/Location";

// Supabase용 LocationRepository 구현체
export class SbLocationRepository implements LocationRepository {
  async findAll(): Promise<Location[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("location")
      .select("id, content");

    if (error || !data) {
      console.error("위치 목록 가져오기 실패:", error);
      return [];
    }

    // Supabase에서 가져온 데이터를 Entity로 변환
    return data.map(
      (locationRow) => new Location(locationRow.id, locationRow.content)
    );
  }
}
