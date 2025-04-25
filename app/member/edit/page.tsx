"use client";

import Image from "next/image";
import Button from "@/components/button/Button";
import styles from "./edit.module.scss";
import TextInput from "@/components/textInput/TextInput";
import CheckInput from "@/components/checkInput/CheckInput";
import { useAuthStore } from "stores/authStore";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useToastStore } from "stores/toastStore";
import { useRouter } from "next/navigation";

interface EditFormData {
  name: string;
  email: string;
  nickname: string;
  profileImage: string;
}

const EditMyProfile: React.FC = () => {
  const { name, email, nickname, profileImage } = useAuthStore();
  const router = useRouter();
  const { showToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);

  const [previewImage, setPreviewImage] = useState<string>(
    profileImage || "/logos/char-success.svg"
  );
  useEffect(() => {
    if (profileImage) {
      setPreviewImage(profileImage);
    }
  }, [profileImage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useForm<EditFormData>({
    mode: "onChange",
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
      nickname: nickname ?? "",
      profileImage: profileImage ?? "",
    },
  });
  const handleCheckEmailDuplicate = async () => {
    const email = getValues("email");
    if (!email) {
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
      console.error("이메일 중복 확인 실패:", error);
      setError("email", { message: "중복 확인 중 오류 발생" });
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
      console.error("중복 확인 중 오류 발생:", error);
      setError("nickname", { message: "중복 확인 중 오류 발생" });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmitEditForm = async (data: EditFormData) => {
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
      const response = await fetch("/api/users/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          nickname: data.nickname,
          profileImage: data.profileImage,
          userType: "member",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "내 정보 수정에 실패했습니다.");
      }

      router.replace("/member");

      // 라우팅 후 토스트 표시 (전역 상태에서 관리)
      showToast("내 정보가 수정되었습니다.", "success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
        showToast(error.message, "error");
      } else {
        setError("root", { message: "내 정보 수정에 실패했습니다." });
        showToast("내 정보 수정에 실패했습니다.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`${styles["edit-my-profile"]} main-container`}>
      <form onSubmit={handleSubmit(handleSubmitEditForm)}>
        <div className={styles["contents-container"]}>
          <div className={styles["title"]}>내 정보 수정</div>
          <div className={styles["img-container"]}>
            <figure>
              <Image
                className={styles["profile-img"]}
                src={previewImage}
                alt="사용자의 프로필 이미지"
                width={100}
                height={100}
              />
            </figure>
            <label htmlFor="profile-image" className={styles["camera-wrapper"]}>
              <Image
                src="/icons/camera-icon.svg"
                alt="카메라 이미지"
                width={32}
                height={32}
                className={styles["camera-icon"]}
              />
            </label>
            <input
              id="profile-image"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
              style={{ display: "none" }} // 💡 화면에 보이지 않게
            />
          </div>
        </div>

        <TextInput
          id="name"
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
          id="email"
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          error={errors.email}
          onCheckClick={handleCheckEmailDuplicate} // ✅ 빠졌던 중복 확인 함수
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
            minLength: { value: 2, message: "닉네임은 2자 이상 입력해주세요." },
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이내로 입력해주세요.",
            },
          })}
          error={errors.nickname}
          onCheckClick={handleCheckNicknameDuplicate}
          isAvailable={isNicknameAvailable}
        />

        <div className={styles["button-container"]}>
          <Button
            size="full"
            label="내 정보 수정"
            htmlType="submit"
            type={isLoading ? "disabled" : "default"}
            onClick={handleSubmit(handleSubmitEditForm)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditMyProfile;
