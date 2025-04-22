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
  register: Record<string, any>;
  error?: FieldError;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PwInput = ({ id, label, placeholder, register, error }: PwInputProps) => {
  const [isPwVisible, setIsPwVisible] = useState<boolean>(false);

  return (
    <TextInput
      id={id}
      type={isPwVisible ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      register={register}
      error={error}
    >
      <button
        type="button"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsPwVisible(!isPwVisible);
        }}
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
