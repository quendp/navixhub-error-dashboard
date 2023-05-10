"use client";
import { fetcher } from "@/utils/fetcher";
import { useState } from "react";
import useSWR from "swr";
import styles from "@/styles/App.module.scss";
import ErrorItems from "./ErrorItems";
import SortItems from "./SortItems";
import Pagination from "./Pagination";
import ErrorDetails from "./ErrorDetails";
import Image from "next/image";

interface ErrorData {
  id: number;
  error_description: any;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

const ErrorList = (): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [chosenError, setChosenError] = useState(1);
  const [showLatest, setShowLatest] = useState(false);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}?page=${currentPage}`,
    fetcher
  );

  const changePageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (pageNumber !== data.results.last_page) {
      setShowLatest(false);
    }
  };

  const sortLatest = () => {
    setCurrentPage(data.results.last_page);
    setShowLatest(true);
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
        <SortItems sortLatest={sortLatest} />
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
        {!showLatest
          ? data.results.data.map((errorItem: ErrorData, index: number) => (
              <ErrorItems
                key={errorItem.id}
                index={index}
                setShowDetails={setShowDetails}
                setChosenError={setChosenError}
                {...errorItem}
              />
            ))
          : data.results.data
              .reverse()
              .map((errorItem: ErrorData, index: number) => (
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
