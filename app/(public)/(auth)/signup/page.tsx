"use client";

import styles from "./signup.module.scss";
import TextInput from "@/components/textInput/TextInput";
import CheckInput from "@/components/checkInput/CheckInput";
import PwInput from "@/components/pwInput/PwInput";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    watch,
  } = useForm<SignUpFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      nickname: "",
      password: "",
      pwConfirm: "",
    },
  });

  const handleCheckEmailDuplicate = async () => {
    clearErrors("email");

    const email = getValues("email");
    if (!email) {
      clearErrors("email");
      setError("email", { message: "이메일을 입력해주세요." });
      return;
    }

    try {
      const response = await fetch(
        `/api/auth/duplicate/email?value=${encodeURIComponent(email)}`
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

  const handleCheckNicknameDuplicate = async () => {
    const nickname = getValues("nickname");
    if (!nickname) {
      setError("nickname", { message: "닉네임을 입력해주세요." });
      return;
    }

    try {
      const response = await fetch(
        `/api/auth/duplicate/nickname?value=${encodeURIComponent(nickname)}`
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

  const handleSubmitSignUpForm = async (data: SignUpFormData) => {
    if (isEmailAvailable !== true) {
      setError("email", { message: "이메일 중복 확인이 필요합니다." });
      return;
    }

    if (isNicknameAvailable !== true) {
      setError("nickname", { message: "닉네임 중복 확인이 필요합니다." });
      return;
    }

    setIsLoading(true);

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
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "회원가입에 실패했습니다." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "email") {
        setIsEmailAvailable(null);
      } else if (name === "nickname") {
        setIsNicknameAvailable(null);
      }

      if (name === "password") {
        const pwConfirmValue = getValues("pwConfirm");
        if (pwConfirmValue) {
          if (value.password !== pwConfirmValue) {
            setError("pwConfirm", {
              message: "비밀번호가 변경되었습니다. 다시 확인해주세요.",
            });
          } else {
            clearErrors("pwConfirm");
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setError, clearErrors, getValues]);

  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpTitle}>회원가입</h1>
      <form
        onSubmit={handleSubmit(handleSubmitSignUpForm)}
        className={styles.signUpInputContainer}
      >
        <TextInput
          id="signup-text-input"
          type="text"
          label="이름"
          placeholder="이름을 입력해주세요."
          register={register("name", {
            required: "이름을 입력해주세요.",
            minLength: {
              value: 2,
              message: "이름은 2자 이상 입력해주세요.",
            },
            maxLength: {
              value: 10,
              message: "이름은 10자 이내로 입력해주세요.",
            },
            pattern: {
              value: /^[가-힣]+$/,
              message: "한글 이름을 작성해주세요. (최소 2글자, 완성된 글자)",
            },
          })}
          error={errors.name}
        />

        <CheckInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
          id="email"
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          error={errors.email}
          onCheckClick={handleCheckEmailDuplicate}
          isAvailable={isEmailAvailable}
          nextInputId="nickname"
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
          onCheckClick={handleCheckNicknameDuplicate}
          error={errors.nickname}
          isAvailable={isNicknameAvailable}
          nextInputId="signup-pw-input"
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

        <div className={styles.signUpBtnContainer}>
          <Button
            label="회원가입"
            size="full"
            type={isLoading ? "disabled" : "default"}
            onClick={handleSubmit(handleSubmitSignUpForm)}
            htmlType="submit"
          />
        </div>
      </form>
    </div>
  );
}
