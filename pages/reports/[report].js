import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useApi, useSortListMethod } from "@/store/store";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const Reports = () => {
  const router = useRouter();
  const id = router.query.report;

  const [errorDescription, setErrorDescription] = useState("");
  const api = useApi((state) => state.api);

  // get report based on the given url params
  const {
    data: errorReport,
    error,
    isLoading,
  } = useSWR(`${api}/${id}`, fetcher);

  // get latest report for navigation data
  const {
    data: latestReport,
    error: latestReportError,
    isLoading: latestReportLoading,
  } = useSWR(`${api}?orderBy=id:desc&sizePerPage=1`, fetcher);

  const sortBy = useSortListMethod((state) => state.sortMethod);

  useEffect(() => {
    console.log(sortBy);
    if (errorReport) {
      try {
        const errorJson = JSON.parse(errorReport?.results?.error_description);
        console.log("errJson", errorJson);
        setErrorDescription(errorJson);
      } catch (e) {
        setErrorDescription(errorReport?.results?.error_description);
      }
    }
  }, [errorReport]);

  if (error)
    return (
      <p className={`${inter.className} errorDetails mainContent`}>
        An error has occurred.
      </p>
    );
  if (isLoading)
    return (
      <p className={`${inter.className} errorDetails`}>
        <Image src="/loader.svg" width={30} height={30} alt="loader image" />
      </p>
    );

  const dateFormat = errorReport.results?.created_at.split("T");
  const timeFormat = dateFormat[1].split(":");

  return (
    <>
      <Head>
        <title> Error Report #{id} </title>
        <meta
          name="description"
          content="A dashboard for project error reports."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.className} errorDetails mainContent`}>
        <div className="errorContent">
          <div className="contentHeader">
            <span>{errorReport.results?.id || "N/A"}</span>
            <a>
              <button onClick={() => router.back()}> Go back </button>
            </a>
          </div>
          <div className="contentColumn">
            <div>
              <p>
                Name: <span>{errorDescription[0]?.name || "N/A"}</span>
              </p>
              <p>
                Role: <span>{errorDescription[0]?.role || "N/A"}</span>
              </p>
            </div>
            <div>
              <p>
                Date: <span> {dateFormat[0] || "N/A"}</span>
              </p>
              <p>
                Time:{" "}
                <span>
                  {" "}
                  {timeFormat[0]}:{timeFormat[1] || "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div className="contentColumn">
            <div>
              <p>
                Clinician ID:{" "}
                <span>{errorDescription[0]?.clinician_id || "N/A"}</span>
              </p>
              <p>
                OS: <span>{errorDescription[0]?.os || "N/A"}</span>
              </p>
            </div>
            <div>
              <p>
                Browser:{" "}
                <span>
                  {errorDescription[0]?.browser?.name || "N/A"} v.
                  {errorDescription[0]?.browser?.version || "N/A"}
                </span>
              </p>
              <p>
                Resolution:{" "}
                <span>{errorDescription[0]?.resolution || "N/A"}</span>
              </p>
            </div>
          </div>
          <div className="contentColumn">
            <div>
              <p>
                Error Name:{" "}
                <span>{errorDescription[0]?.error?.name || "N/A"}</span>
              </p>
              <p>
                Error Message:{" "}
                <span>{errorDescription[0]?.error?.message || "N/A"}</span>
              </p>
            </div>
            <div>
              <p>
                Line Number:{" "}
                <span>{errorDescription[0]?.error?.lineNumber || "N/A"}</span>
              </p>
              <p>
                Column Number:{" "}
                <span>{errorDescription[0]?.error?.columnNumber || "N/A"}</span>
              </p>
            </div>
          </div>
          <div className="contentRow">
            <p>
              File Name:{" "}
              <span>{errorDescription[0]?.error?.fileName || "N/A"}</span>
            </p>
          </div>
          <div className="contentRow">
            <p>
              URL: <span>{errorDescription[0]?.url || "N/A"}</span>
            </p>
            <p>
              Subdomain: <span>{errorDescription[0]?.subdomain || "N/A"}</span>
            </p>
            <p>
              Timezone: <span>{errorDescription[0]?.timezone || "N/A"}</span>
            </p>
            <p>
              Remarks: <span>{errorDescription[1] ?? "N/A"}</span>
            </p>
          </div>
          <div className="contentRow">
            <p>Error Info (Component Stack): </p>
            <p className="contentErrorInfo">
              {errorDescription[0]?.errorInfo?.componentStack || "N/A"}
            </p>
          </div>
          {!latestReportError && !latestReportLoading ? (
            <div className="reportNavBtns">
              <Link
                style={{order: `${sortBy === "id:desc" ? "0" : "1"}`}}
                href={`/reports/${
                  +latestReport.results.last_page === +id ? id : +id + 1
                }`}
              >
                <button disabled={+latestReport.results.last_page === +id}>
                  {" "}
                  {sortBy === "id:desc" ? "Prev" : "Next"} {" "}
                </button>
              </Link>
              <Link href={`/reports/${+id === 1 ? id : +id - 1}`}>
                <button disabled={+id === 1}> {sortBy === "id:desc" ? "Next" : "Prev"} {" "} </button>
              </Link>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;
