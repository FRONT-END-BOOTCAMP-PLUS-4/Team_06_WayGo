import Link from "next/link";
import styles from "./profileDropdown.module.scss";

const ProfileDropdown = () => {
  return (
    <ul className={styles["profile-dropdown"]}>
      <li>
        <Link href="/member">마이 프로필</Link>
      </li>
      <hr />
      <li>
        <div>로그아웃</div>
      </li>
    </ul>
  );
};

export default ProfileDropdown;
