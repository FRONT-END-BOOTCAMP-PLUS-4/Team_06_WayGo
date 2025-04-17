import { PlanCardDto } from "./PlanCardDto";

export interface PlanListDto {
  title?: string | null;
  plans: PlanCardDto[];
  totalCount?: number | null;
  totalPages?: number | null;
  currentPage?: number | null;
}
