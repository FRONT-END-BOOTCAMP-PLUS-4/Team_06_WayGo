"use client";
import Button from "@/components/button/Button";
import Image from "next/image";
import styles from "./userInfoCard.module.scss";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  email: string;
  nickname: string;
  profileImage: string;
}

interface UserInfoCardProps {
  userInfo: UserInfoProps;
}

const UserInfoCard = ({ userInfo }: UserInfoCardProps) => {
  const router = useRouter();
  return (
    <div className={styles["my-info-card"]}>
      <figure>
        {userInfo.profileImage ? (
          <Image
            src={userInfo.profileImage}
            alt="사용자의 프로필 이미지"
            width={100}
            height={100}
          />
        ) : (
          <Image
            src="/logos/char-success.svg" // 또는 fallback 이미지 경로
            alt="기본 프로필 이미지"
            width={100}
            height={100}
          />
        )}
      </figure>
      <div>
        <p className={styles["user-nickname"]}>{userInfo.nickname}</p>
        <p className={styles["user-email"]}>{userInfo.email}</p>
      </div>
      <Button
        size="medium"
        type="lined"
        label="내 정보 수정"
        onClick={() => router.push("/member/edit")}
      />
    </div>
  );
};

export default UserInfoCard;
