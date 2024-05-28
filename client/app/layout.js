import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './provider'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leetcode POTD",
  description: "App by RTR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
