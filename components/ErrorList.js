import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useReportsTableStore } from "../store/store";
import { fetcher } from "../utils/fetcher";
import ErrorItems from "./ErrorItems";
import Pagination from "./Pagination";

const ErrorList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(() =>
    page && !isNaN(+page) ? page : 1
  );

  const [sortBy, setSortBy] = useState("id:desc");

  const reports = useReportsTableStore((state) => state.reports);
  const setReports = useReportsTableStore((state) => state.setReports);

  const {
    data: fetchedReports,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API}?orderBy=${sortBy}&page=${currentPage}`,
    fetcher
  );

  useEffect(() => {
    setReports(fetchedReports);
  }, [fetchedReports, setReports]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const changePageHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  if (!reports) {
    return <p>No reports found.</p>;
  }
  console.log(reports);
  return (
    <>
      <div className="listHeader">
        <div className="sortList">
          <label htmlFor="sortList">Sort by:</label>
          <select
            name="sortList"
            id="sortList"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value={"id:desc"}>Latest First</option>
            <option value={"id:asc"}>Oldest First</option>
          </select>
        </div>
        <div>
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
