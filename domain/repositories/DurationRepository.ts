import { Duration } from "domain/entities/Duration";

export interface DurationRepository {
  findAll(): Promise<Duration[]>;
}
