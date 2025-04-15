import styles from "./checkInput.module.scss";
import TextInput from "@/components/textInput/TextInput";

const CheckInput = () => {
  return (
    <TextInput id="test" type="email" className="check-input">
      <button className={styles.button}>중복확인</button>
    </TextInput>
  );
};

export default CheckInput;
