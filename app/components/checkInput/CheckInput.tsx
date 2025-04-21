//CheckInput.tsx
"use client";
import Button from "@/components/button/Button";
import TextInput from "@/components/textInput/TextInput";
import React, { useState } from "react";

interface CheckInputProps {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckClick?: () => void;
}

const CheckInput = ({
  label,
  placeholder,
  type,
  id,
  value: externalValue,
  onChange: externalOnChange,
  onCheckClick,
}: CheckInputProps) => {
  const [value, setValue] = useState("");

  // 외부에서 value와 onChange가 제공되었는지 확인
  const isControlled =
    externalValue !== undefined && externalOnChange !== undefined;
  const currentValue = isControlled ? externalValue : value;

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      // 외부에서 관리하는 경우
      externalOnChange(e);
    } else {
      // 내부에서 관리하는 경우
      setValue(e.target.value);
    }
  };

  const handleInputValidate = () => {
    // 외부에서 제공된 onCheckClick 함수가 있으면 사용, 없으면 기본 동작 수행
    if (onCheckClick) {
      onCheckClick();
    } else {
      console.log("입력된 값: ", currentValue);
    }
  };

  return (
    <TextInput
      id={id}
      type={type}
      className="check-input"
      label={label}
      placeholder={placeholder}
      value={currentValue}
      onChange={handleInputValueChange}
    >
      <Button
        size="small"
        label="중복확인"
        type="lined"
        onClick={handleInputValidate}
      />
    </TextInput>
  );
};

export default CheckInput;
