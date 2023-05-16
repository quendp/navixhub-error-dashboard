import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const Reports = () => {
  const router = useRouter();
  const id = router.query.report;

  const {
    data: errorReport,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API}/${id}`, fetcher);

  const [errorDescription, setErrorDescription] = useState("");

  useEffect(() => {
    if (errorReport) {
      try {
        const errorJson = JSON.parse(errorReport?.results?.error_description);
        setErrorDescription(errorJson);
        console.log(errorJson);
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
    <div className={`${inter.className} errorDetails mainContent`}>
      <div className="errorContent">
        <div className="contentHeader">
          <span>{errorReport.results?.id || "N/A"}</span>
          <Link href={`/`}>
            <button> Go back </button>
          </Link>
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
        <div className="contentRow">
          <p>
            Remarks: <span>{errorDescription[1] ?? "N/A"}</span>
          </p>
          <p>
            URL: <span>{errorDescription[0]?.url || "N/A"}</span>
          </p>
          <p>
            Subdomain: <span>{errorDescription[0]?.subdomain || "N/A"}</span>
          </p>
          <p>
            Timezone: <span>{errorDescription[0]?.timezone || "N/A"}</span>
          </p>
        </div>
        <div className="contentRow">
          <p>Error Info (Component Stack): </p>
          <p className="contentErrorInfo">
            {errorDescription[0]?.errorInfo?.componentStack || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
