import Image from "next/image";
import styles from "./rootFooter.module.scss";

const RootFooter = () => {
  return (
    <footer className={styles.footer}>
      <div>© 2025 폭주냥이. All Rights Reserved.</div>
      <ul>
        <li>개인정보처리방침</li>
        <li>
          <Image
            src="/icons/github-icon.svg"
            alt="GitHub 아이콘"
            width={16}
            height={16}
          />
          GitHub
        </li>
        <li>
          <Image
            src="/icons/email-icon.svg"
            alt="Email 아이콘"
            width={16}
            height={16}
          />
          문의하기
        </li>
      </ul>
    </footer>
  );
};

export default RootFooter;
