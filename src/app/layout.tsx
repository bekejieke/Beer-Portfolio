import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Beer Portfolio",
    template: "%s | Beer Portfolio"
  },
  description:
    "Personal developer portfolio for AI product practice, WeChat mini programs, web development, and product design evidence.",
  metadataBase: new URL("https://beer-portfolio.example.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
