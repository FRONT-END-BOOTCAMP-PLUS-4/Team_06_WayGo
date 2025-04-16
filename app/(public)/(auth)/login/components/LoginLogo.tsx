"use client";

import Image from "next/image";

export default function LoginLogo() {
  return (
    <Image
      src="/logos/logo-slogan.svg"
      alt="웨이고 메인 로고"
      width={250}
      height={175}
    />
  );
}
