"use client";

import Image from "next/image";
import styles from "./login.module.scss";
import TextInput from "@/components/textInput/TextInput";
import PwInput from "@/components/pwInput/PwInput";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "stores/authStore";
import { parseJwt } from "utils/jwt";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    setEmail,
    setName,
    setNickname,
    setToken,
    setProfileImage,
    setCreatedAt,
    setId,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      console.log("로그인 시도:", data.email);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      console.log("로그인 응답:", response.status, result);

      if (!response.ok) {
        setError("email", {
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
        return;
      }

      // 로그인 성공 시 zustand 스토어에 사용자 정보 저장
      if (result.token) {
        // JWT 토큰에서 사용자 정보 추출
        const userData = parseJwt(result.token);
        console.log("파싱된 사용자 정보:", userData);

        // 스토어에 사용자 정보 저장
        setToken(result.token);
        setEmail(userData.email || "");
        setName(userData.name || "");
        setNickname(userData.nickname || "");

        // id가 있으면 저장
        if (userData.id) {
          setId(userData.id);
          console.log("사용자 ID 저장:", userData.id);
        }

        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }

        if (userData.createdAt) {
          setCreatedAt(new Date(userData.createdAt));
        }
      }

      router.push("/");
    } catch (error: unknown) {
      console.error("로그인 오류:", error);
      setError("email", {
        message: "로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignUp = () => {
    router.push("/signup");
  };

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

      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <div className={styles.inputGroup}>
          <TextInput
            id="email"
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            register={register("email", {
              required: "이메일을 입력해주세요.",
            })}
            error={errors.email}
          />
          <PwInput
            id="login-pw-input"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            error={errors.password}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            label="로그인"
            size="full"
            type={isLoading ? "disabled" : "default"}
            htmlType="submit"
          />
          <Button
            label="회원가입"
            size="full"
            type="lined"
            onClick={handleNavigateToSignUp}
            htmlType="button"
          />
        </div>
      </form>
    </div>
  );
}
