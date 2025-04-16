import styles from "./layout.module.scss";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authLayoutContainer}>
      {/* 왼쪽에는 사진또는 영상 */}
      <div className={styles.authLayoutLeft}>
        <Image src="/images/auth-cover.jpg" alt="auth-image" fill />
      </div>
      <div className={styles.authLayoutRight}>{children}</div>
    </div>
  );
}
