// 로그인 이메일 입력 필드
"use client";

import TextInput from "@/components/textInput/TextInput";
import React from "react";

export default function LoginEmailInput() {
  return (
    <TextInput
      id="email"
      type="email"
      label="이메일"
      placeholder="이메일을 입력해주세요."
      labelSize=""
    />
  );
}
