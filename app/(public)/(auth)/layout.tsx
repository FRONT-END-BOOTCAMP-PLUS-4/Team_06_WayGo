import styles from "./layout.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.authLayoutContainer}>
        <div className={styles.authLayoutWrapper}>
          <div className={styles.authLayoutLeft}>
            {/* 왼쪽에는 사진또는 영상 */}
          </div>
          <div className={styles.authLayoutRight}>{children}</div>
        </div>
      </div>
    </>
  );
}
