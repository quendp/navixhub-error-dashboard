import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useApi, useReportsTableStore, useSortListMethod } from "@/store/store";
import { fetcher } from "@/utils/fetcher";
import ErrorItems from "./ErrorItems";
import Pagination from "./Pagination";
import Select from "react-select";

const sortOptions = [
  { value: "id:desc", label: "Latest First" },
  { value: "id:asc", label: "Oldest First" },
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

const ErrorList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page);

  const sortBy = useSortListMethod((state) => state.sortMethod);
  const setSortBy = useSortListMethod((state) => state.setSortMethod);

  const reports = useReportsTableStore((state) => state.reports);
  const setReports = useReportsTableStore((state) => state.setReports);

  const api = useApi((state) => state.api);

  const {
    data: fetchedReports,
    error,
    isLoading,
  } = useSWR(`${api}?orderBy=${sortBy}&page=${currentPage}`, fetcher);

  useEffect(() => {
    setReports(fetchedReports);
    setCurrentPage(page);
  }, [page, fetchedReports, setReports]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const changePageHandler = (pageNumber) => {
    router.push(
      pathname + "?" + createQueryString("page", pageNumber.toString())
    );
  };

  if (error) return <p>An error has occurred.</p>;
  if (isLoading)
    return (
      <p>
        <Image src="/loader.svg" width={30} height={30} alt="loader image" />
      </p>
    );
  if (!reports || fetchedReports?.results?.data?.length === 0) {
    return <p>No reports found.</p>;
  }

  return (
    <>
      <div className="listHeader">
        <div className="sortList">
          <label htmlFor="sortList">Sort by:</label>
          <Select
            className="sortListItem"
            classNamePrefix="sortListItem"
            defaultValue={sortOptions[0]}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
            name="sortList"
            options={sortOptions}
            styles={sortStyles}
            onChange={(e) => {
              setSortBy(e.value);
              changePageHandler(1);
            }}
          />
        </div>
        <div className="listHeaderDetails">
          <span>Version: {reports.version}</span>
          <span>Total Errors: {reports.results.total}</span>
        </div>
      </div>
      <ul>
        <li className="listLabels">
          <span>ID</span>
          <span>Name</span>
          <span>Role</span>
          <span>Date</span>
          <span>Time</span>
          <span></span>
        </li>
        {reports.results.data.map((errorItem, index) => (
          <ErrorItems key={errorItem.id} index={index} {...errorItem} />
        ))}
      </ul>
      <Pagination
        changePageHandler={changePageHandler}
        results={reports.results}
      />
    </>
  );
};

export default ErrorList;
