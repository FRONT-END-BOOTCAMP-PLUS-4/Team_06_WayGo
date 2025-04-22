import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "nczpznqwunnksyjjbirg.supabase.co", // ✅ supabase 저장소 도메인 추가!
    ],
  },
};

export default nextConfig;
