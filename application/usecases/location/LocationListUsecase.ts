import { LocationRepository } from "domain/repositories/LocationRepository";
import { LocationListDto } from "./dto/LocationListDto";
import { Location } from "domain/entities/Location";

export class LocationListUsecase {
  constructor(private readonly LocationRepository: LocationRepository) {}

  async execute(): Promise<LocationListDto[]> {
    const locations: Location[] = await this.LocationRepository.findAll();

    return locations.map((location) => ({
      id: location.id,
      content: location.content,
    }));
  }
}
