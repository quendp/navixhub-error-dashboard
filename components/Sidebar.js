import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className={`${inter.className} sidebar`}>
      <h2>Naxi Hub Error Dashboard</h2>
      <div>
        <Link
          href={`/`}
          className={`${inter.className} ${pathname === "/" ? "active" : ""}`}
        >
          Overview
        </Link>
        <Link
          href={`/reports`}
          className={`${inter.className} ${
            pathname === "/reports" ? "active" : ""
          }`}
        >
          Reports
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
