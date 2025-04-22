import { SeasonRepository } from "domain/repositories/SeasonRepository";
import { SeasonListDto } from "./dto/SeasonListDto";

export class SeasonListUsecase {
  constructor(private seasonRepository: SeasonRepository) {}

  async execute(): Promise<SeasonListDto[]> {
    const seasons = await this.seasonRepository.findAll();
    return seasons.map((season) => ({
      id: season.id,
      content: season.contents,
    }));
  }
}
