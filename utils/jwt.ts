// JWT 토큰 파싱 유틸리티

/**
 * JWT 토큰을 파싱하여 페이로드 데이터를 추출하는 함수
 * @param token JWT 토큰 문자열
 * @returns 디코딩된 JWT 페이로드 객체
 */
export function parseJwt(token: string) {
  try {
    // Base64 디코딩을 위해 토큰의 페이로드 부분만 추출 (두 번째 부분)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Base64 디코딩 후 JSON 파싱
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 파싱 오류:", error);
    return {};
  }
}
