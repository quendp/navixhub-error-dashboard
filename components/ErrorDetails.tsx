import styles from "@/styles/App.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DetailsProps {
  showDetails: boolean;
  setShowDetails: any;
  error: any;
}
const ErrorDetails = ({ error, showDetails, setShowDetails }: DetailsProps) => {
  const [errorDescription, setErrorDescription] = useState<any>("");

  const dateFormat = error.created_at.split("T");
  const timeFormat = dateFormat[1].split(":");

  useEffect(() => {
    try {
      const errorJson = JSON.parse(error.error_description);
      setErrorDescription(errorJson);
    } catch (e) {
      setErrorDescription(error.error_description);
    }
  }, [error.error_description]);

  const onCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div
      style={{ display: showDetails ? "flex" : "none" }}
      className={styles.errorDetails}
    >
      <div className={styles.errorContent}>
        <div className={styles.contentHeader}>
          <span>{error.id || "N/A"}</span>
          <Image
            src="/xmark-solid-dark.svg"
            width={30}
            height={30}
            alt="Close button"
            onClick={onCloseDetails}
          />
        </div>
        <div className={styles.contentColumn}>
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
        <div className={styles.contentColumn}>
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
        <div className={styles.contentRow}>
          <p>
            Remarks:{" "}
            <span>
              {(typeof errorDescription === "object" && errorDescription[1]) ||
                "N/A"}
            </span>
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
        <div className={styles.contentRow}>
          <p>Error Info (Component Stack): </p>
          <p className={styles.contentErrorInfo}>
            {errorDescription[0]?.errorInfo?.componentStack || "N/A"}
          </p>
        </div>
        <button onClick={onCloseDetails}>Ok</button>
      </div>
    </div>
  );
};

export default ErrorDetails;
