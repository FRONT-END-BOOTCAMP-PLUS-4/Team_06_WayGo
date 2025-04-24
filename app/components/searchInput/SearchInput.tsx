"use client";
import TextInput from "@/components/textInput/TextInput";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "stores/authStore";
interface SearchInputProps {
  currValue?: string;
  onEnter?: () => void;
}
const SearchInput = ({ currValue }: SearchInputProps) => {
  const [value, setValue] = useState(currValue ?? "");
  const router = useRouter();
  const { id } = useAuthStore();

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const handleSearch = () => {
    if (!value.trim()) {
      return;
    }

    if (id) {
      // 로그인이 되어 있는 경우, /member 경로로 이동
      router.push(`/member/plans?keyword=${encodeURIComponent(value)}`);
    } else {
      // 비회원인 경우, /plan 경로로 이동
      router.push(`/plans?keyword=${encodeURIComponent(value)}`);
    }
  };

  return (
    <TextInput
      id="search"
      placeholder="검색어를 입력해주세요."
      value={value}
      onChange={handleSearchValueChange}
      onEnter={handleSearch}
    >
      <button
        style={{ cursor: "pointer" }}
        type="submit"
        onClick={handleSearch}
      >
        <Image
          src="/icons/search-icon.svg"
          alt="검색 아이콘"
          width={25}
          height={25}
        />
      </button>
    </TextInput>
  );
};

export default SearchInput;
