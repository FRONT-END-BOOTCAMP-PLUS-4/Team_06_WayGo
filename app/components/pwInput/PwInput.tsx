"use client";
import TextInput from "@/components/textInput/TextInput";
import Image from "next/image";
import React, { useState } from "react";

const PwInput: React.FC = () => {
  const [isPwVisible, setIsPwVisible] = useState<boolean>(false);

  return (
    <TextInput
      id="password"
      type={isPwVisible ? "text" : "password"}
      label="비밀번호"
      placeholder="비밀번호를 입력해주세요."
    >
      <button
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
