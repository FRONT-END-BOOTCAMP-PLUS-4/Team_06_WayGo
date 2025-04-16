// 회원가입 비밀번호 입력 필드

import PwInput from "@/components/pwInput/PwInput";

export default function SignUpPwInput() {
  return (
    <>
      <PwInput
        id="signup-pw-input"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
      />
    </>
  );
}
