export interface CategoryOption {
  id: number;
  content: string;
}

export interface CategoryResponse {
  season: CategoryOption[];
  duration: CategoryOption[];
  budget: CategoryOption[];
  location: CategoryOption[];
}
