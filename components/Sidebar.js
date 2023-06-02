import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Select from "react-select";
import { useApi } from "@/store/store";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const sortOptions = [
  { value: process.env.NEXT_PUBLIC_TEST1, label: "Test1" },
  { value: process.env.NEXT_PUBLIC_TEST, label: "Test" },
  { value: process.env.NEXT_PUBLIC_DEV, label: "Development" },
  { value: process.env.NEXT_PUBLIC_STAGING, label: "Staging" },
  { value: process.env.NEXT_PUBLIC_DEMO, label: "Demo" },
  { value: process.env.NEXT_PUBLIC_PROD, label: "Production" },
];

const sortStyles = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? "rgb(35, 35, 35)" : "transparent",
    color: isSelected ? "rgb(226, 188, 104)" : "rgb(235, 230, 230)",
    ":active": {
      ...styles[":active"],
      color: "rgb(226, 188, 104)",
    },
  }),
  menu: (styles) => ({ ...styles, backgroundColor: "rgb(25, 25, 25)" }),
};
const Sidebar = () => {
  const setApi = useApi((state) => state.setApi);

  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className={`${inter.className} sidebar`}>
      <h2>Navix Hub Error Dashboard</h2>
      <div className="sortList">
        <label htmlFor="sortApi">Environment : </label>
        <Select
          className="sortListItem"
          classNamePrefix="sortListItem"
          defaultValue={sortOptions[0]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={false}
          name="sortApi"
          options={sortOptions}
          styles={sortStyles}
          instanceId="selectApi"
          onChange={(e) => {
            router
              .push("/")
              .then(() => setApi(e.value))
              .catch((e) => console.log(e));
          }}
        />
      </div>
      <div className="navMenu">
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
