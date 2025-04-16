// 회원가입 텍스트 입력 필드

import TextInput from "@/components/textInput/TextInput";

export default function SignUpTextInput() {
  return (
    <TextInput
      id="signup-text-input"
      type="text"
      label="이름"
      placeholder="이름을 입력해주세요."
      labelSize=""
    />
  );
}
