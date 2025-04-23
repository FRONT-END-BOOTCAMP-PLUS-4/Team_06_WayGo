import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "utils/jwt";

// 인증 필요한 경로 정의 (비인증 사용자는 접근 불가)
const protectedPaths = ["/member"]; // 인증 필요한 경로

// 인증된 사용자가 접근할 수 없는 경로 정의
const publicOnlyPaths = ["/login", "/signup"];

// Next.js 앱 라우터에서 실제 경로와 매칭될 패턴 정의
export const config = {
  matcher: ["/login", "/signup", "/member/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // zustand가 로컬스토리지에 저장한 인증 정보 확인 (쿠키로 접근)
    const authStorageCookie = request.cookies.get("auth-storage")?.value;

    // 인증 상태 초기화
    let isAuthenticated = false;

    if (authStorageCookie) {
      try {
        // JSON 문자열을 파싱하여 토큰 존재 여부 확인
        const authData = JSON.parse(decodeURIComponent(authStorageCookie));

        // 토큰 유효성 검증 (존재 및 만료 여부 체크)
        isAuthenticated = authData.token ? isTokenValid(authData.token) : false;

        // 토큰이 만료된 경우 쿠키 삭제
        if (authData.token && !isAuthenticated) {
          const response = NextResponse.redirect(
            new URL("/login", request.url)
          );
          response.cookies.delete("auth-storage");
          return response;
        }
      } catch (e) {
        console.error("쿠키 파싱 오류:", e);
      }
    }

    // 1. 로그인/회원가입 페이지 처리 (인증된 사용자는 접근 불가)
    const isPublicOnlyPath = publicOnlyPaths.includes(pathname);

    if (isPublicOnlyPath && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. 보호된 페이지 처리 (비인증 사용자는 접근 불가)
    for (const protectedPath of protectedPaths) {
      if (pathname.startsWith(protectedPath)) {
        if (!isAuthenticated) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }
    }

    // 그 외 정상 접근
    return NextResponse.next();
  } catch (error) {
    console.error("미들웨어 오류:", error);
    return NextResponse.next();
  }
}
