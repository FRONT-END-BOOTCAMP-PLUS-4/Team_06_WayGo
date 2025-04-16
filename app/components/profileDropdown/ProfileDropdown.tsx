import Link from "next/link";
import styles from "./profileDropdown.module.scss";

const ProfileDropdown = () => {
  return (
    <ul className={styles["profile-dropdown"]}>
      <li>마이 프로필</li>
      <hr />
      <li>로그아웃</li>
    </ul>
  );
};

export default ProfileDropdown;
