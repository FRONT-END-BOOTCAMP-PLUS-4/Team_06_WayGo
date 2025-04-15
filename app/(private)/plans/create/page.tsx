import React from "react";
import styles from "./create.module.scss";
import TextInput from "@/components/textInput/TextInput";
import SelectBasic from "@/components/selectBasic/selectBasic";

const CreatePlan: React.FC = () => {
  return (
    <main className="main-container">
      <section className={styles["create-header"]}>
        <h1>✍️ 여행 계획 작성</h1>
        <p>나의 여행 계획을 적어 주세요.</p>
      </section>
      <form className={styles["create-form"]}>
        <fieldset>
          <legend>
            기본 정보
            <p>여행 계획의 기본 정보를 입력해주세요.</p>
          </legend>
          <TextInput
            id="planTitle"
            label="제목"
            placeholder="제목을 입력해주세요."
          />
          <SelectBasic />
        </fieldset>

        <fieldset>
          <legend>
            상세 정보
            <p>여행 계획의 상세 정보를 입력해주세요.</p>
          </legend>
        </fieldset>
      </form>
    </main>
  );
};

export default CreatePlan;
