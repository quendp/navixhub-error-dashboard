import { fetcher } from "../utils/fetcher";
import { useCallback, useState } from "react";
import useSWR from "swr";
import ErrorItems from "./ErrorItems";
import SortItems from "./SortItems";
import Pagination from "./Pagination";
import ErrorDetails from "./ErrorDetails";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ErrorList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
  console.log(data);
  return (
    <>
      <div className="listHeader">
        <SortItems onSortLatest={onSortLatest} />
        <div>
          <span>Version: {data.version}</span>
          <span>Total Errors: {data.results.total}</span>
        </div>
      </div>
      <ul>
        <li className="listLabels">
          <span>No.</span>
          <span>Name</span>
          <span>Role</span>
          <span>Date</span>
          <span>Time</span>
          <span></span>
        </li>
        {data.results.data.map((errorItem, index) => (
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
