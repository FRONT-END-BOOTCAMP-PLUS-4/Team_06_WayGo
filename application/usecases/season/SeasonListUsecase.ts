import { SeasonRepository } from "domain/repositories/SeasonRepository";
import { SeasonListDto } from "./dto/SeasonListDto";
import { Season } from "domain/entities/Season";

export class SeasonListUsecase {
  constructor(private readonly SeasonRepository: SeasonRepository) {}

  async execute(): Promise<SeasonListDto[]> {
    const seasons: Season[] = await this.SeasonRepository.findAll();

    return seasons.map((season) => ({
      id: season.id,
      content: season.content,
    }));
  }
}
