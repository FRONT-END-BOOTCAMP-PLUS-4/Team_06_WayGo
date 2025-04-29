//PwInput.tsx
"use client";
import TextInput from "@/components/textInput/TextInput";
import Image from "next/image";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";

interface PwInputProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  register: Record<string, unknown>;
  error?: FieldError;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

const PwInput = ({
  id,
  label,
  placeholder,
  register,
  error,
  onEnter,
}: PwInputProps) => {
  const [isPwVisible, setIsPwVisible] = useState<boolean>(false);

  // 비밀번호 토글 버튼 클릭 핸들러
  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    // 이벤트 전파 방지 (중요)
    e.preventDefault();
    e.stopPropagation();
    setIsPwVisible(!isPwVisible);
  };

  return (
    <TextInput
      id={id}
      type={isPwVisible ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      register={register}
      error={error}
      onEnter={onEnter}
    >
      <button
        type="button"
        style={{ cursor: "pointer" }}
        onClick={handleTogglePasswordVisibility}
      >
        <Image
          src={
            isPwVisible
              ? "/icons/eye-open-icon.svg"
              : "/icons/eye-closed-icon.svg"
          }
          alt={isPwVisible ? "비밀번호 표시" : "비밀번호 숨김"}
          width={20}
          height={18}
        />
      </button>
    </TextInput>
  );
};

export default PwInput;
