// 요청을 가로채서 토큰 검증 및 사용자 정보 조회 후 요청을 전달
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: [
    // 보호된 API 경로 지정
    // "/api/:path*",
    // 로그인/회원가입 제외
    // "/((?!api/auth/login|api/auth/signup).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 인증 필요 없는 경로 제외
  if (
    pathname.includes("/api/auth/login") ||
    pathname.includes("/api/auth/signup")
  ) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return NextResponse.json(
      { error: "승인되지 않음: 토큰이 없습니다." },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    console.error(
      "토큰 검증 오류: 제공된 인증 토큰이 유효하지 않습니다.",
      error
    );
    return NextResponse.json(
      { error: "인증 정보가 올바르지 않습니다. 다시 로그인해 주세요." },
      { status: 401 }
    );
  }
}
