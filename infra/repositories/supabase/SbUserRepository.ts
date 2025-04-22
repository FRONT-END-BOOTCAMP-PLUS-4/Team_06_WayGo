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

    console.log(`이메일로 사용자 조회: ${email}`);

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

    // 사용자가a 없을 경우 null 반환
    if (!data) {
      console.log("사용자를 찾을 수 없음");
      return null;
    }

    console.log(
      `사용자 조회 결과: ${JSON.stringify({
        ...data,
        password: data.password ? "******" : "undefined",
      })}`
    );

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

    console.log(`중복 확인 시도 - 필드: ${field}, 값: ${value}`);

    const { data, error } = await supabase
      .from("users")
      .select(field)
      .eq(field, value)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error(`중복 확인 에러: ${error.message}`);
      throw new Error(`${field} 중복 확인 실패: ${error.message}`);
    }

    console.log(`중복 확인 데이터: ${JSON.stringify(data)}`);
    const isDuplicate = !!data;
    console.log(`중복 여부: ${isDuplicate}`);

    return isDuplicate;
  }
}
