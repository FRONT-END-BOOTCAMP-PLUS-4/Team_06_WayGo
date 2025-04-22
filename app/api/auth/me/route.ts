// 로그인한 유저 사용자 정보 가져오기
// GET /api/auth/me

import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "로그인되지 않음" }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    nickname: user.user_metadata?.nickname ?? null,
    profileImage: user.user_metadata?.profileImage ?? null,
  });
}
