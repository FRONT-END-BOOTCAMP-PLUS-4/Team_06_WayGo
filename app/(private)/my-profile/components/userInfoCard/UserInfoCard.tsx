import Button from "@/components/button/Button";
import Image from "next/image";
import styles from "./userInfoCard.module.scss";

interface UserInfoProps {
  email: string;
  nickname: string;
  profileImg: string;
}

interface UserInfoCardProps {
  userInfo: UserInfoProps;
}

const UserInfoCard = ({ userInfo }: UserInfoCardProps) => {
  return (
    <div className={styles["my-info-card"]}>
      <figure>
        <Image
          src={userInfo.profileImg}
          alt="사용자의 프로필 이미지"
          width={100}
          height={100}
        />
      </figure>
      <div>
        <p className={styles["user-nickname"]}>{userInfo.nickname}</p>
        <p className={styles["user-email"]}>{userInfo.email}</p>
      </div>
      <Button size="large" type="lined" label="내 정보 수정" />
    </div>
  );
};

export default UserInfoCard;
