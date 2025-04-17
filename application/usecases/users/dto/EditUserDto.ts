export interface EditUserDto {
  nickname?: string;
  currentPassword?: string;
  newPassword?: string;
  profileImage?: string | null;
}
