import { LocationListDto } from "./dto/LocationListDto";
import { LocationRepository } from "domain/repositories/LocationRepository";

export class LocationListUsecase {
  constructor(private locationRepository: LocationRepository) {}

  async execute(): Promise<LocationListDto[]> {
    const locations = await this.locationRepository.findAll();
    return locations.map((location) => ({
      id: location.id,
      content: location.contents,
    }));
  }
}
