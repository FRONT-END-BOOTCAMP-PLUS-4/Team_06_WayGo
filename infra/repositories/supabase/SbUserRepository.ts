import { UserRepository } from "domain/repositories/UserRepository";
import { createClient } from "../../../utils/supabase/server";
import { User } from "domain/entities/User";

export class SbUserRepository implements UserRepository {
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
      throw new Error(`이메일 조회 실패: ${error.message}`);
    }
    return {
      ...data,
      createdAt: data?.created_at,
    } as User | null;
  }
}
