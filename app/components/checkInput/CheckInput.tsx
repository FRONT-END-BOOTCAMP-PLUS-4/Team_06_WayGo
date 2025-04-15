"use client";
import Button from "@/components/button/Button";
import TextInput from "@/components/textInput/TextInput";
import React, { useState } from "react";

const CheckInput: React.FC = () => {
  const [value, setValue] = useState("");
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputValidate = () => {
    console.log("입력된 값: ", value);
  };

  return (
    <TextInput
      id="valid-check"
      type="email"
      className="check-input"
      label="이메일"
      placeholder="이메일을 입력해주세요."
      value={value}
      onChange={handleInputValueChange}
    >
      <Button size="small" label="중복확인" onClick={handleInputValidate} />
    </TextInput>
  );
};

export default CheckInput;
