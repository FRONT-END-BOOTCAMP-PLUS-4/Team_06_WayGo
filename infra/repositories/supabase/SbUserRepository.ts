import { createClient } from "utils/supabase/server";
import { UserRepository } from "domain/repositories/UserRepository";
import { User } from "domain/entities/User";

export class SbUserRepository implements UserRepository {
  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`사용자 조회 실패: ${error.message}`);
      throw new Error(`사용자 조회 실패: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      userType: data.user_type,
      profileImage: data.profile_image,
      createdAt: data.created_at,
      deletedAt: data.deleted_at,
    } as User;
  }
  async save(user: User): Promise<User> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .insert({
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        password: user.password,
        user_type: user.userType,
      })
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(`회원가입 실패: ${error.message}`);
    }

    if (!data) {
      throw new Error("회원가입 실패: 데이터가 없습니다.");
    }

    return data;
  }

  async findByEmail(email: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      // PGRST116: 데이터가 없는 경우
      console.error(`이메일 조회 실패: ${error.message}`);
      throw new Error(`이메일 조회 실패: ${error.message}`);
    }

    // 사용자가 없을 경우 null 반환
    if (!data) {
      return null;
    }

    // User 객체로 변환하여 반환
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      userType: data.user_type,
      profileImage: data.profile_image,
      createdAt: data.created_at,
      deletedAt: data.deleted_at,
    } as User;
  }

  async checkDuplicate(
    field: "email" | "nickname",
    value: string
  ): Promise<boolean> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select(field)
      .eq(field, value)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error(`중복 확인 에러: ${error.message}`);
      throw new Error(`${field} 중복 확인 실패: ${error.message}`);
    }

    const isDuplicate = !!data;

    return isDuplicate;
  }
}
