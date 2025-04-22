import { DurationListDto } from "./dto/DurationListDto";
import { DurationRepository } from "domain/repositories/DurationRepository";

export class DurationListUsecase {
  constructor(private durationRepository: DurationRepository) {}

  async execute(): Promise<DurationListDto[]> {
    const durations = await this.durationRepository.findAll();
    return durations.map((duration) => ({
      id: duration.id,
      content: duration.contents,
    }));
  }
}
