// 회원가입 페이지

import styles from "./signup.module.scss";
import TextInput from "@/components/textInput/TextInput";
import CheckInput from "@/components/checkInput/CheckInput";
import PwInput from "@/components/pwInput/PwInput";
import Button from "@/components/button/Button";

export default function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpTitle}>회원가입</h1>
      <div className={styles.signUpInputContainer}>
        <TextInput
          id="signup-text-input"
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요."
        />
        <CheckInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
          id="email"
        />
        <CheckInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          type="text"
          id="nickname"
        />
        <PwInput
          id="signup-pw-input"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
        />
        <PwInput
          id="signup-pw-confirm-input"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      <div className={styles.signUpBtnContainer}>
        <Button label="회원가입" size="full" type="lined" />
      </div>
    </div>
  );
}
