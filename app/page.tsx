"use client";

import { useState } from "react";
import Button from "@/components/button/Button";
import TextArea from "./components/textArea/TextArea";

export default function Home() {
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="main-container">
      <h1>메인 페이지입니다.</h1>
      <Button label="확인" type="default" onClick={() => alert("확인")} />
      <TextArea value={comment} onChange={handleChange} />
    </div>
  );
}
