import PlanCardList from "@/components/planCardList/PlanCardList";
import styles from "./myProfile.module.scss";
import React from "react";
import UserInfoCard from "@/(private)/my-profile/components/userInfoCard/UserInfoCard";

const MyProfile: React.FC = () => {
  const userInfo = {
    email: "test@waygo.com",
    nickname: "Test",
    profileImg: "/logos/char-success.svg",
  };

  return (
    <div className="main-container">
      <h1 className={styles["my-profile-header"]}>🙋‍♂️ 마이 페이지</h1>
      <UserInfoCard userInfo={userInfo} />
      <PlanCardList />
    </div>
  );
};

export default MyProfile;
