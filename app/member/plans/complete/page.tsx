"use client";

import Image from "next/image";
import styles from "./complete.module.scss";
import Button from "@/components/button/Button";
import { useRouter, useSearchParams } from "next/navigation";

const CompletePlan: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className={`${styles["complete-container"]} main-container`}>
      <div className={styles["complete-text"]}>
        {"여행 계획이 작성되었어요! 🥳"}
      </div>
      <Image
        src={"/logos/char-success.svg"}
        alt="success image"
        width={224}
        height={156}
      />
      <div className={styles["action-container"]}>
        <Button
          size="large"
          type="lined"
          label="메인으로"
          onClick={() => {
            router.push("/");
          }}
        />
        <Button
          size="large"
          type="default"
          label="내 계획으로"
          onClick={() => {
            router.push(`/member/plans/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default CompletePlan;
