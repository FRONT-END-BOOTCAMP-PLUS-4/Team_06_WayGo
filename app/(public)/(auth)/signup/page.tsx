// 회원가입 페이지
import SignUpForm from "./components/SignUpForm";
import styles from "./signup.module.scss";

export default function SignUpPage() {
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpTitle}>회원가입</h1>
      <div className={styles.signUpFormContainer}>
        <SignUpForm />
      </div>
    </div>
  );
}
