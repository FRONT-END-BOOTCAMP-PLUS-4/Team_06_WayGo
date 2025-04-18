import { Location } from "domain/entities/Location";

export interface LocationRepository {
  findAll(): Promise<Location[]>;
}
