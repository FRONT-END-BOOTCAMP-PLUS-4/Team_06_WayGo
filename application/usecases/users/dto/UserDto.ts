export interface UserDto {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  profileImage?: string | null;
  userType: string;
  createdAt: Date;
  deletedAt?: Date | null;
}
