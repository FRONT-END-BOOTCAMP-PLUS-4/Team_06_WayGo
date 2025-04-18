import Link from "next/link";
import styles from "./dropdown.module.scss";
import { ReactNode } from "react";

export type DropdownItem = {
  type: "link" | "button" | "custom";
  label?: string;
  href?: string;
  onClick?: () => void;
  element?: ReactNode; // type === "custom"일 때 사용
};

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown = ({ items }: DropdownProps) => {
  return (
    <ul className={styles["profile-dropdown"]}>
      {items.map((item, idx) => {
        switch (item.type) {
          case "link":
            return (
              <li key={idx}>
                <Link href={item.href || "#"}>{item.label}</Link>
              </li>
            );
          case "button":
            return (
              <li key={idx}>
                <button onClick={item.onClick}>{item.label}</button>
              </li>
            );
          case "custom":
            return <li key={idx}>{item.element}</li>;
          default:
            return null;
        }
      })}
    </ul>
  );
};

export default Dropdown;
