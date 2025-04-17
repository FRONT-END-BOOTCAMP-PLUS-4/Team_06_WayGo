export interface UserDto {
  id: number;
  email: string;
  name: string;
  nickname: string;
  profileImage?: string | null;
  userType: string;
  createdAt: Date;
  deletedAt?: Date | null;
}
