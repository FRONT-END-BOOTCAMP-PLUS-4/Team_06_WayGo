"use client";

import PwInput from "@/components/pwInput/PwInput";

export default function LoginPwInput() {
  return (
    <div>
      <PwInput
        id="login-pw-input"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
      />
    </div>
  );
}
