import { useRouter } from "next/router";

const Reports = () => {
  const router = useRouter();
  const id = router.query.report;

  return <p>Post: {id} </p>;
};

export default Reports;
