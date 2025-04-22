"use client";

import styles from "./signup.module.scss";
import TextInput from "@/components/textInput/TextInput";
import CheckInput from "@/components/checkInput/CheckInput";
import PwInput from "@/components/pwInput/PwInput";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// 회원가입 폼 타입 정의
interface SignUpFormData {
  name: string;
  email: string;
  nickname: string;
  password: string;
  pwConfirm: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // 이메일과 닉네임 중복 확인 상태
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
    defaultValues: {
      name: "",
      email: "",
      nickname: "",
      password: "",
      pwConfirm: "",
    },
  });

  // 이메일 중복 확인 함수
  const checkEmailDuplicate = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    clearErrors("email");

    const email = getValues("email");
    console.log("이메일", email);
    if (!email) {
      clearErrors("email");
      setError("email", { message: "이메일을 입력해주세요." });
      return;
    }

    try {
      const response = await fetch(
        `/api/auth?field=email&value=${encodeURIComponent(email)}`
      );
      const result = await response.json();

      setIsEmailAvailable(result.available);

      if (!result.available) {
        setError("email", { message: result.message });
      } else {
        clearErrors("email");
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패: ", error);
      setError("email", { message: "이메일 중복 확인에 실패했습니다." });
    }
  };

  // 닉네임 중복 확인 함수
  const checkNicknameDuplicate = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const nickname = getValues("nickname");
    console.log("닉네임", nickname);
    if (!nickname) {
      setError("nickname", { message: "닉네임을 입력해주세요." });
      return;
    }

    try {
      const response = await fetch(
        `/api/auth?field=nickname&value=${encodeURIComponent(nickname)}`
      );
      const result = await response.json();

      setIsNicknameAvailable(result.available);

      if (!result.available) {
        setError("nickname", { message: result.message });
      } else {
        clearErrors("nickname");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      setError("nickname", { message: "닉네임 중복 확인에 실패했습니다." });
    }
  };

  // 폼 제출 처리
  const onSubmit = async (data: SignUpFormData) => {
    // 중복 확인 유효성 검사
    if (isEmailAvailable !== true) {
      setError("email", { message: "이메일 중복 확인이 필요합니다." });
      return;
    }

    if (isNicknameAvailable !== true) {
      setError("nickname", { message: "닉네임 중복 확인이 필요합니다." });
      return;
    }

    setIsLoading(true);
    setFormError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          nickname: data.nickname,
          password: data.password,
          userType: "member",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "회원가입에 실패했습니다.");
      }

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("회원가입에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일이나 닉네임이 변경되면 중복 확인 상태 초기화
  watch((value, { name }) => {
    if (name === "email") {
      setIsEmailAvailable(null);
    } else if (name === "nickname") {
      setIsNicknameAvailable(null);
    }
  });

  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpTitle}>회원가입</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.signUpInputContainer}
      >
        <TextInput
          id="signup-text-input"
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요."
          register={register("name", {
            required: "이름을 입력해주세요.",
            maxLength: {
              value: 10,
              message: "이름은 10자 이내로 입력해주세요.",
            },
          })}
          error={errors.name}
        />

        <CheckInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
          id="email"
          // register 를 props 로 전달
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          // error 도 props 로 전달
          error={errors.email}
          onCheckClick={checkEmailDuplicate}
        />

        <CheckInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          type="text"
          id="nickname"
          register={register("nickname", {
            required: "닉네임을 입력해주세요.",
            minLength: {
              value: 2,
              message: "닉네임은 2자 이상 입력해주세요.",
            },
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이내로 입력해주세요.",
            },
          })}
          onCheckClick={checkNicknameDuplicate}
          error={errors.nickname}
        />

        <PwInput
          id="signup-pw-input"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상 입력해주세요.",
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
              message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
            },
          })}
          error={errors.password}
        />

        <PwInput
          id="signup-pw-confirm-input"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          register={register("pwConfirm", {
            required: "비밀번호를 한번 더 확인해주세요.",
            validate: (value) =>
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
          })}
          error={errors.pwConfirm}
        />

        {/* {formError && <p className={styles.errorMessage}>{formError}</p>} */}

        <div className={styles.signUpBtnContainer}>
          <Button
            label="회원가입"
            size="full"
            type="lined"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
