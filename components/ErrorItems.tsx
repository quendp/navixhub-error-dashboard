import React, { useEffect, useState } from "react";

interface ErrorData {
  index: number;
  id: number;
  error_description: any;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  setShowDetails: any;
  setChosenError: any;
}
const ErrorItems = ({
  index,
  id,
  error_description,
  updated_at,
  created_at,
  deleted_at,
  setShowDetails,
  setChosenError,
}: ErrorData) => {
  const dateFormat = created_at.split("T");
  const timeFormat = dateFormat[1].split(":");

  const [errorDescription, setErrorDescription] = useState<any>("");

  useEffect(() => {
    try {
      const errorJson = JSON.parse(error_description);
      setErrorDescription(errorJson);
    } catch (e) {
      setErrorDescription(error_description);
    }
  }, [error_description]);

  const onClickDetails = () => {
    setShowDetails(true);
    setChosenError(index);
  };

  return (
    <li>
      <span> {id} </span>
      <span> {errorDescription[0]?.name || "N/A"} </span>
      <span> {errorDescription[0]?.role || "N/A"} </span>
      <span> {dateFormat[0]} </span>
      <span>
        {" "}
        {timeFormat[0]}:{timeFormat[1]}{" "}
      </span>
      <button onClick={onClickDetails}>View Details</button>
    </li>
  );
};

export default ErrorItems;
