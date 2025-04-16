"use client";
import React, { useState } from "react";
import styles from "./create.module.scss";
import TextInput from "@/components/textInput/TextInput";
import SelectBasic from "@/components/selectBasic/selectBasic";
import FileBox from "@/(private)/plans/create/components/FileBox";
import TextArea from "@/components/textArea/TextArea";
import Button from "@/components/button/Button";

const durationOptionList = [
  { value: 1, title: "당일치기" },
  { value: 2, title: "1박2일" },
  { value: 3, title: "2박3일" },
  { value: 4, title: "3박4일~" },
];

const seasonOptionList = [
  { value: 1, title: "봄 🌸" },
  { value: 2, title: "여름 🤿" },
  { value: 3, title: "가을 🍁" },
  { value: 4, title: "겨울 ❄️" },
];

const locationOptionList = [
  { value: 1, title: "수도권" },
  { value: 2, title: "강원권" },
  { value: 3, title: "충청권" },
  { value: 4, title: "호남권" },
  { value: 5, title: "경상권" },
  { value: 6, title: "제주권" },
];

const budgetOptionList = [
  { value: 1, title: "~10만원" },
  { value: 2, title: "10~20만원" },
  { value: 3, title: "20~40만원" },
  { value: 4, title: "40만원~" },
];

const CreatePlan: React.FC = () => {
  const [travelSchedule, setTravelSchedule] = useState("");
  const [travelDetail, setTravelDetail] = useState("");
  const [travelTip, setTravelTip] = useState("");

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
          <div className={styles["select-container"]}>
            <SelectBasic
              option={durationOptionList}
              label="여행기간"
              placeholder="여행간 기간을 선택해주세요."
            />
            <SelectBasic
              option={budgetOptionList}
              label="예산"
              placeholder="여행에 사용한 1인당 예산을 선택해주세요."
            />
            <SelectBasic
              option={locationOptionList}
              label="지역"
              placeholder="여행간 지역을 선택해주세요."
            />
            <SelectBasic
              option={seasonOptionList}
              label="계절"
              placeholder="여행간 계절을 선택해주세요."
            />
          </div>
          <FileBox label="대표 이미지" multiple={false} />
          <FileBox label="추가 이미지" multiple={true} />
        </fieldset>

        <fieldset>
          <legend>
            상세 정보
            <p>여행 계획의 상세 정보를 입력해주세요.</p>
          </legend>
          <TextArea
            label="여행 일정"
            placeholder="여행 일정을 입력해주세요."
            value=""
            onChange={(e) => setTravelSchedule(e.target.value)}
          />
          <TextArea
            label="상세 정보"
            placeholder="여행에 대한 세부 정보를 입력해주세요."
            value=""
            onChange={(e) => setTravelDetail(e.target.value)}
          />
          <TextArea
            label="여행 꿀팁"
            placeholder="여행하는 동안 생긴 꿀팁을 공유해주세요."
            value=""
            onChange={(e) => setTravelTip(e.target.value)}
          />
        </fieldset>
        <div className={styles["action-container"]}>
          <Button size="large" type="lined" label="작성 취소" />
          <Button size="large" type="default" label="여행 계획 저장" />
        </div>
      </form>
    </main>
  );
};

export default CreatePlan;
