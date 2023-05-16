import React, { useEffect, useState } from "react";

const ErrorItems = ({
  index,
  id,
  error_description,
  updated_at,
  created_at,
  deleted_at,
  setShowDetails,
  setChosenError,
}) => {
  const dateFormat = created_at.split("T");
  const timeFormat = dateFormat[1].split(":");

  const [errorDescription, setErrorDescription] = useState("");

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
