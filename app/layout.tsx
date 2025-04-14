import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "WayGo - 웨이고",
  description: "당신",
  icons: {
    icon: [{ url: "/logos/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
