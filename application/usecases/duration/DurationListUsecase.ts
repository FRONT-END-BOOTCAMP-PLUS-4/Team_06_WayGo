import { DurationRepository } from "domain/repositories/DurationRepository";
import { DurationListDto } from "./dto/DurationListDto";
import { Duration } from "domain/entities/Duration";

export class DurationListUsecase {
  constructor(private readonly DurationRepository: DurationRepository) {}

  async execute(): Promise<DurationListDto[]> {
    const durations: Duration[] = await this.DurationRepository.findAll();

    return durations.map((duration) => ({
      id: duration.id,
      content: duration.contents,
    }));
  }
}
