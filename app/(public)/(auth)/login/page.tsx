// 로그인 페이지
import LoginForm from "./components/LoginForm";
import styles from "./login.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
}
