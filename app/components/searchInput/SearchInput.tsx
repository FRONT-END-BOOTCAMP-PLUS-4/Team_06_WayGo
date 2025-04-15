"use client";
import TextInput from "@/components/textInput/TextInput";
import styles from "./searchInput.module.scss";
import Image from "next/image";
import { useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("입력된 값: ", value);
  };

  return (
    <TextInput
      id="search"
      placeholder="검색어를 입력해주세요."
      value={value}
      onChange={handleSearchValueChange}
    >
      <button
        type="submit"
        className={styles["search-button"]}
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
