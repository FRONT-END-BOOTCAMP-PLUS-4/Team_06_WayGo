export interface RespondCommentDto {
  id: number;
  content: string;
  userId: string;
  planId: number;
  createdAt: string;
  updatedAt?: string | null;
  nickname: string;
  profileImage?: string | null;
}
