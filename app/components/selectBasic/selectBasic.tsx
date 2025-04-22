"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./selectBasic.module.scss";

interface SelectBasicProps {
  label?: string;
  placeholder?: string;
  option: OptionProps[];
  selectedValue?: number;
  setSelectedValue?: (value: number) => void;
}

interface OptionProps {
  value: number;
  title: string;
}

const SelectBasic = ({
  option,
  placeholder,
  label,
  selectedValue,
  setSelectedValue,
}: SelectBasicProps) => {
  // const [selectedValue, setSelectedValue] = useState<string | number>();
  const [selectedLabel, setSelectedLabel] = useState(placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      setIsFocused(next);
      return next;
    });
  };

  const closeOption = () => {
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleSelectOption = (
    value: number,
    title: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    setSelectedValue(value);
    setSelectedLabel(title);
    closeOption();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeOption();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {label && <h1 className={styles.selectLabel}>{label}</h1>}
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
            {option.map((item: OptionProps) => (
              <div
                key={item.value}
                className={`${styles.optionItem} ${selectedValue === item.value ? styles.selected : ""}`}
                onClick={(e) => handleSelectOption(item.value, item.title, e)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBasic;
