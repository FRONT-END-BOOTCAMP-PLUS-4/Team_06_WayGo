import { NextRequest, NextResponse } from "next/server";

// 인증 필요한 경로 정의 (비인증 사용자는 접근 불가)
const protectedPaths = ["/mypage"]; // 인증 필요한 경로

// 인증된 사용자가 접근할 수 없는 경로 정의
const publicOnlyPaths = ["/login", "/signup"];

// Next.js 앱 라우터에서 실제 경로와 매칭될 패턴 정의
export const config = {
  matcher: ["/login", "/signup", "/mypage/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 디버깅 로그
  console.log("미들웨어 실행 경로:", pathname);

  try {
    // zustand가 로컬스토리지에 저장한 인증 정보 확인 (쿠키로 접근)
    const authStorageCookie = request.cookies.get("auth-storage")?.value;

    // 인증 상태 초기화
    let isAuthenticated = false;

    if (authStorageCookie) {
      try {
        // JSON 문자열을 파싱하여 토큰 존재 여부 확인
        const authData = JSON.parse(decodeURIComponent(authStorageCookie));
        isAuthenticated = !!(authData.state && authData.state.token);
        console.log("미들웨어 인증 상태:", isAuthenticated, "경로:", pathname);
      } catch (e) {
        console.error("쿠키 파싱 오류:", e);
      }
    }

    // 1. 로그인/회원가입 페이지 처리 (인증된 사용자는 접근 불가)
    const isPublicOnlyPath = publicOnlyPaths.includes(pathname);
    console.log("인증 전용 페이지 여부:", isPublicOnlyPath, "경로:", pathname);

    if (isPublicOnlyPath && isAuthenticated) {
      console.log("인증된 사용자의 인증 페이지 접근 차단 →", pathname);
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. 보호된 페이지 처리 (비인증 사용자는 접근 불가)
    for (const protectedPath of protectedPaths) {
      if (pathname.startsWith(protectedPath)) {
        console.log("보호된 페이지 요청:", pathname);

        if (!isAuthenticated) {
          console.log("비인증 사용자의 보호 페이지 접근 차단 →", pathname);
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
