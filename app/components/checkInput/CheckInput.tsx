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
}

const CheckInput = ({ label, placeholder, type, id }: CheckInputProps) => {
  const [value, setValue] = useState("");
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputValidate = () => {
    console.log("입력된 값: ", value);
  };

  return (
    <TextInput
      id={id}
      type={type}
      className="check-input"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleInputValueChange}
    >
      <Button size="small" label="중복확인" onClick={handleInputValidate} />
    </TextInput>
  );
};

export default CheckInput;
