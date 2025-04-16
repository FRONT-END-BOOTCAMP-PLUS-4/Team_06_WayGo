import styles from "./layout.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authLayoutContainer}>
      {/* 왼쪽에는 사진또는 영상 */}
      <div className={styles.authLayoutLeft}></div>
      <div className={styles.authLayoutRight}>{children}</div>
    </div>
  );
}
