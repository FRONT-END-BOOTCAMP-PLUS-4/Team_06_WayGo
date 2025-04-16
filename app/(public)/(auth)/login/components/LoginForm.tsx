// 로그인 전체 폼
"use client";
import styles from "./loginForm.module.scss";

import LoginBtn from "./LoginBtn";
import LoginEmailInput from "./LoginEmailInput";
import LoginLogo from "./LoginLogo";
import LoginPwInput from "./LoginPwInput";
import SignUpBtn from "./SignUpBtn";

export default function LoginForm() {
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <LoginLogo />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <LoginEmailInput />
            <LoginPwInput />
          </div>

          <div className={styles.buttonGroup}>
            <LoginBtn />
            <SignUpBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
