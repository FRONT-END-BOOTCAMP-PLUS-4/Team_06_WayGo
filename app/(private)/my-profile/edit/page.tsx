"use client";

import Image from "next/image";
import Button from "@/components/button/Button";
import styles from "./edit.module.scss";
import TextInput from "@/components/textInput/TextInput";
import CheckInput from "@/components/checkInput/CheckInput";

const EditMyProfile: React.FC = () => {
  const userInfo = {
    name: "이름이름",
    email: "test@waygo.com",
    nickname: "Test",
    profileImg: "/logos/char-success.svg",
  };
  return (
    <div className={`${styles["edit-my-profile"]} main-container`}>
      <div className={styles["contents-container"]}>
        <div className={styles["title"]}>{"내 정보 수정"}</div>
        <div className={styles["img-container"]}>
          <figure>
            <Image
              className={styles["profile-img"]}
              src={userInfo.profileImg}
              alt="사용자의 프로필 이미지"
              width={100}
              height={100}
            />
          </figure>
          <Image
            src="/icons/camera-icon.svg"
            alt="카메라 이미지"
            width={32}
            height={32}
            className={styles["camera-icon"]}
          />
        </div>
      </div>
      <TextInput
        id="my-profile-text-input"
        type="text"
        label="이름"
        value="이름이름"
        readOnly={true}
        placeholder="이름을 입력해주세요."
      />
      <TextInput
        id="my-profile-text-input"
        type="email"
        label="이메일"
        value="email@waygo.com"
        readOnly={true}
        placeholder="이메일을 입력해주세요."
      />
      <CheckInput
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        type="text"
        // value="닉네임은 닉"
        id="nickname"
      />
      <div className={styles["button-container"]}>
        <Button size="large" type="lined" label="회원가입" />
      </div>
    </div>
  );
};

export default EditMyProfile;
