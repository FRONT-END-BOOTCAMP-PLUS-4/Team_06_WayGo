"use client";

import styles from "./layout.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const getRandomImageNum = () => Math.floor(Math.random() * 4) + 1;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [randomImage, setRandomImage] = useState("/images/auth-cover1.jpg");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const randomNum = getRandomImageNum();
      setRandomImage(`/images/auth-cover${randomNum}.jpg`);
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={styles.authLayoutContainer}>
      <div className={styles.authLayoutLeft}>
        <div
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <Image src={randomImage} alt="auth-image" fill priority />
        </div>
      </div>
      <div className={styles.authLayoutRight}>{children}</div>
    </div>
  );
}
