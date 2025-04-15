"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./selectBasic.module.scss";

type OptionProps = {
  value: string;
  label: string;
};

const SelectBasic = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedLabel, setSelectedLabel] =
    useState("장소·일정·계절을 검색해보세요");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const optionList: OptionProps[] = [
    { value: "1", label: "옵션1" },
    { value: "2", label: "옵션2" },
    { value: "3", label: "옵션3" },
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const handleSelectOption = (value: string, label: string) => {
    console.log("옵션 선택: ", { value, label });
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.selectContainer} ${isFocused ? styles.focused : ""}`}
      onClick={handleToggleDropdown}
    >
      <div className={styles.selectWrapper}>
        <span
          className={`${styles.placeholder} ${selectedValue ? styles.selected : ""}`}
        >
          {selectedLabel}
        </span>
        <div className={styles.arrow}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isOpen ? styles.rotated : styles.normal}
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={styles.optionsContainer}>
          {optionList.map((option) => (
            <div
              key={option.value}
              className={`${styles.optionItem} ${selectedValue === option.value ? styles.selected : ""}`}
              onClick={() => handleSelectOption(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBasic;
