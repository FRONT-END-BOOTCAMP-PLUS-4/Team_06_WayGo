// 회원가입 이메일 중복확인 입력 필드

import CheckInput from "@/components/checkInput/CheckInput";

export default function SignUpEmailCheckInput() {
  return (
    <CheckInput
      label="이메일"
      placeholder="이메일을 입력해주세요."
      type="email"
      id="email"
    />
  );
}
