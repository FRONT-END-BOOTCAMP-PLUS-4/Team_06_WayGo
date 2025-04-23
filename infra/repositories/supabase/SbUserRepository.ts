import { createClient } from "utils/supabase/server";
import { UserRepository } from "domain/repositories/UserRepository";
import { User } from "domain/entities/User";
type UserTableRow = {
  id: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  profile_image?: string | null;
  user_type: string;
  created_at?: string;
  deleted_at?: string | null;
};
export class SbUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("유저 찾기 실패:", error);
      return null;
    }

    return data ? this.toEntity(data) : null;
  }

  async update(user: User): Promise<User> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .update({
        nickname: user.nickname,
        profile_image: user.profileImage,
        // 비밀번호나 이름 같은 건 지금 수정 안 함 (필요하면 추가)
        updated_at: new Date().toISOString(), // 수정 시각 저장
      })
      .eq("id", user.id)
      .select("*")
      .single();

    if (error || !data) {
      console.error("유저 업데이트 실패:", error);
      throw new Error("유저 업데이트 실패");
    }

    return this.toEntity(data);
  }

  private toEntity(data: UserTableRow): User {
    return new User(
      data.email,
      data.password,
      data.name,
      data.nickname,
      data.user_type,
      data.profile_image ?? null,
      data.created_at ? new Date(data.created_at) : undefined,
      data.deleted_at ? new Date(data.deleted_at) : undefined,
      data.id
    );
  }
}
