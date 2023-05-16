import Link from "next/link";
import React, { useEffect, useState } from "react";

const ErrorItems = ({ id, error_description, created_at }) => {
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
      <Link href={`/${id}`}>
        <button>View Details</button>
      </Link>
    </li>
  );
};

export default ErrorItems;
