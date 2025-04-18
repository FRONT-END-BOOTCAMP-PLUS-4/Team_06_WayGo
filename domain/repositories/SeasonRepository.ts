import { Season } from "domain/entities/Season";

export interface SeasonRepository {
  findAll(): Promise<Season[]>;
}
