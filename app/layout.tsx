import { Inter } from "next/font/google";
import "../styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | Error Reports",
  description: "A dashboard for project error reports.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>{children}</body>
    </html>
  );
}
