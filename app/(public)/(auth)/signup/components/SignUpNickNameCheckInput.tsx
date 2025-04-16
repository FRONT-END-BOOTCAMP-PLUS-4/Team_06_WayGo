// 회원가입 닉네임 중복확인 입력 필드
import CheckInput from "@/components/checkInput/CheckInput";

export function SignUpNicknameCheckInput() {
  return (
    <CheckInput
      label="닉네임"
      placeholder="닉네임을 입력해주세요."
      type="text"
      id="nickname"
    />
  );
}
