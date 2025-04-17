"use client";

import Image from "next/image";
import styles from "./login.module.scss";
import TextInput from "@/components/textInput/TextInput";
import PwInput from "@/components/pwInput/PwInput";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/logos/logo-slogan.svg"
          alt="웨이고 메인 로고"
          width={250}
          height={175}
        />
      </div>

      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <TextInput
            id="email"
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            labelSize=""
          />
          <PwInput
            id="login-pw-input"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button label="로그인" size="full" type="default" />
          <Button
            label="회원가입"
            size="full"
            type="lined"
            onClick={() => router.push("/signup")}
          />
        </div>
      </div>
    </div>
  );
}
