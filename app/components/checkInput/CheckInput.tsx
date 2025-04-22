//CheckInput.tsx
"use client";
import Button from "@/components/button/Button";
import TextInput from "@/components/textInput/TextInput";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CheckInputProps {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  id: string;
  // error 타입 정의
  error?: FieldError;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // register 타입 정의
  register?: UseFormRegisterReturn;
  onCheckClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  isAvailable?: boolean | null; // 중복확인 상태를 나타내는 프롭스 추가
}

const CheckInput = ({
  label,
  placeholder,
  type,
  id,
  onCheckClick,
  error,
  register,
  isAvailable,
}: CheckInputProps) => {
  // 버튼 라벨 설정
  const buttonLabel = isAvailable === true ? "사용가능" : "중복확인";

  return (
    <TextInput
      id={id}
      type={type}
      className="check-input"
      label={label}
      placeholder={placeholder}
      error={error}
      register={register}
    >
      <Button
        size="small"
        label={buttonLabel}
        type="lined"
        onClick={onCheckClick}
      />
    </TextInput>
  );
};

export default CheckInput;
