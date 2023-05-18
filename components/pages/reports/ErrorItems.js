import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const ErrorItems = ({ id, error_description, created_at }) => {
  const dateFormat = format(new Date(created_at), "MMM d',' yyyy");
  const timeFormat = format(new Date(created_at), "p");

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
      <span> {dateFormat} </span>
      <span>{timeFormat}</span>
      <Link href={`/reports/${id}`}>
        <button>View Details</button>
      </Link>
    </li>
  );
};

export default ErrorItems;
