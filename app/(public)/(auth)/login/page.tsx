"use client";

import Image from "next/image";
import styles from "./login.module.scss";
import TextInput from "@/components/textInput/TextInput";
import PwInput from "@/components/pwInput/PwInput";
import Button from "@/components/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "stores/authStore";
import { useToastStore } from "stores/toastStore";
import { parseJwt } from "utils/jwt";
import LoadingArea from "@/components/loadingArea/LoadingArea";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get("expired");
  const [isLoading, setIsLoading] = useState(false);
  const {
    setEmail,
    setName,
    setNickname,
    setToken,
    setProfileImage,
    setCreatedAt,
    setId,
    isAuthenticated,
  } = useAuthStore();
  const { showToast } = useToastStore();

  // 로그인 상태 확인 및 리다이렉션
  useEffect(() => {
    // 이미 로그인된 상태라면 홈으로 리다이렉트
    if (isAuthenticated()) {
      router.replace("/");
    }

    // 토큰 만료로 인한 리다이렉션인 경우 토스트 메시지 표시
    if (expired === "true") {
      showToast("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.", "error");
    }
  }, [isAuthenticated, router, expired, showToast]);

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "waygo@waygo.com",
      password: "team1234!",
    },
  });

  // 폼 제출 함수
  const submitForm = () => {
    // 현재 입력된 이메일과 비밀번호 가져오기
    const emailField = document.getElementById("email") as HTMLInputElement;
    const passwordField = document.getElementById(
      "login-pw-input"
    ) as HTMLInputElement;

    if (!emailField?.value) {
      setError("email", {
        message: "이메일을 입력해주세요.",
      });
      return;
    }

    if (!passwordField?.value) {
      setError("password", {
        message: "비밀번호를 입력해주세요.",
      });
      return;
    }

    // 폼 데이터 직접 생성하여 로그인 처리
    const loginData: LoginFormData = {
      email: emailField.value,
      password: passwordField.value,
    };

    // 로그인 처리
    handleLoginSubmit(loginData);
  };

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
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

        // 스토어에 사용자 정보 저장
        setToken(result.token);
        setEmail(userData.email || "");
        setName(userData.name || "");
        setNickname(userData.nickname || "");

        // id가 있으면 저장
        if (userData.id) {
          setId(userData.id);
        }

        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }

        if (userData.createdAt) {
          setCreatedAt(new Date(userData.createdAt));
        }
      }

      // 홈 페이지로 즉시 이동
      router.replace("/");

      // 라우팅 후 토스트 표시 (전역 상태에서 관리)
      showToast("로그인이 완료되었습니다.", "success");
      return;
    } catch (error: unknown) {
      console.error("로그인 오류:", error);
      showToast(
        "로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.",
        "error"
      );
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

  return isLoading ? (
    <LoadingArea />
  ) : (
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
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        noValidate
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
            onEnter={submitForm}
          />
          <PwInput
            id="login-pw-input"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            error={errors.password}
            onEnter={submitForm}
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
