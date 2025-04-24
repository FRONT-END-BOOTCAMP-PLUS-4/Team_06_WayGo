import { PlanCardDto } from "./PlanCardDto";

export interface PlanListDto {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  plans: PlanCardDto[];
}
