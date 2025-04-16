// 회원가입 전체 폼
"use client";

import styles from "./signUpForm.module.scss";
import SignUpBtn from "./SignUpBtn";
import SignUpEmailCheckInput from "./SignUpEmailCheckInput";
import SignUpPwInput from "./SignUpPwInput";
import SignUpNameInput from "./SignUpNameInput";
import { SignUpNicknameCheckInput } from "./SignUpNickNameCheckInput";
import SignUpPwConfirmInput from "./SignUpPwConfirmInput";

export default function SignUpForm() {
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpInputContainer}>
        <SignUpNameInput />
        <SignUpEmailCheckInput />
        <SignUpNicknameCheckInput />
        <SignUpPwInput />
        <SignUpPwConfirmInput />
      </div>

      <div className={styles.signUpBtnContainer}>
        <SignUpBtn />
      </div>
    </div>
  );
}
