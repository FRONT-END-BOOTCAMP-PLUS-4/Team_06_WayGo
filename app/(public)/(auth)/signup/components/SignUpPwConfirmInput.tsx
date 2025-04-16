import PwInput from "@/components/pwInput/PwInput";

export default function SignUpPwConfirmInput() {
  return (
    <>
      <PwInput
        id="signup-pw-confirm-input"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력해주세요."
      />
    </>
  );
}
