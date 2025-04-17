//PwInput.tsx
"use client";
import TextInput from "@/components/textInput/TextInput";
import Image from "next/image";
import React, { useState } from "react";

interface PwInputProps {
  id: string;
  label: string;
  placeholder: string;
}

const PwInput = ({ id, label, placeholder }: PwInputProps) => {
  const [isPwVisible, setIsPwVisible] = useState<boolean>(false);

  return (
    <TextInput
      id={id}
      type={isPwVisible ? "text" : "password"}
      label={label}
      placeholder={placeholder}
    >
      <button
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
