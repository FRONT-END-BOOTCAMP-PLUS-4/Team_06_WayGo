import { Plan } from "domain/entities/Plan";

export interface PlanCardDto {
  id: number;
  title: string;
  location: { id: number; content: string } | string;
  duration: { id: number; content: string } | string;
  budget: { id: number; content: string } | string;
  season: { id: number; content: string } | string;
  images?: { id: number; imgUrl: string; isDefault: boolean }[];
  userId: string;
  commentContent?: string;
  imgUrl?: string;
}

export function planToPlanCardDto(plan: Plan): PlanCardDto {
  const defaultImage = plan.images?.find((img) => img.isDefault);

  return {
    id: plan.id!,
    title: plan.title,
    location: plan.location ? plan.location.content : "",
    duration: plan.duration ? plan.duration.content : "",
    budget: plan.budget ? plan.budget.content : "",
    season: plan.season ? plan.season.content : "",
    imgUrl:
      defaultImage?.imgUrl ||
      (plan.images && plan.images.length > 0
        ? plan.images[0].imgUrl
        : "/images/jeju.jpg"),
    userId: plan.userId,
    commentContent: "",
    images: plan.images,
  };
}

export function planListToPlanCardDtoList(plans: Plan[]): PlanCardDto[] {
  return plans.map((plan) => planToPlanCardDto(plan));
}
