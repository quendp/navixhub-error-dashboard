"use client";
import { fetcher } from "@/utils/fetcher";
import { useCallback, useRef, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/App.module.scss";
import ErrorItems from "./ErrorItems";
import SortItems from "./SortItems";
import Pagination from "./Pagination";
import ErrorDetails from "./ErrorDetails";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ErrorData {
  id: number;
  error_description: any;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

const ErrorList = (): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(() =>
    page && !isNaN(+page) ? page : 1
  );
  const [showDetails, setShowDetails] = useState(false);
  const [chosenError, setChosenError] = useState(1);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}?page=${currentPage}`,
    fetcher
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const changePageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(
      pathname + "?" + createQueryString("page", pageNumber.toString())
    );
  };

  const onSortLatest = () => {
    const lastItem = (data.results.total % 25) - 1;
    const lastPage = data.results.last_page;
    setCurrentPage(lastPage);
    setChosenError(lastItem);
    setShowDetails(true);
    router.push(
      pathname + "?" + createQueryString("page", lastPage.toString())
    );
  };
  if (error) return <p>An error has occurred.</p>;
  if (isLoading)
    return (
      <p>
        <Image src="/loader.svg" width={30} height={30} alt="loader image" />
      </p>
    );

  return (
    <>
      <div className={styles.listHeader}>
        <SortItems onSortLatest={onSortLatest} />
        <div>
          <span>Version: {data.version}</span>
          <span>Total Errors: {data.results.total}</span>
        </div>
      </div>
      <ul>
        <li className={styles.listLabels}>
          <span>No.</span>
          <span>Name</span>
          <span>Role</span>
          <span>Date</span>
          <span>Time</span>
          <span></span>
        </li>
        {data.results.data.map((errorItem: ErrorData, index: number) => (
          <ErrorItems
            key={errorItem.id}
            index={index}
            setShowDetails={setShowDetails}
            setChosenError={setChosenError}
            {...errorItem}
          />
        ))}
      </ul>
      <Pagination
        changePageHandler={changePageHandler}
        results={data.results}
      />
      <ErrorDetails
        error={data.results.data[chosenError]}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </>
  );
};

export default ErrorList;
