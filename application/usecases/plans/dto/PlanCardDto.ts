export interface PlanCardDto {
  id: number;
  title: string;
  location: { id: number; content: string };
  duration: { id: number; content: string };
  budget: { id: number; content: string };
  season: { id: number; content: string };
  images: { id: number; imgUrl: string; isDefault: boolean }[];
  userId: string;
  commentContent: string;
}
