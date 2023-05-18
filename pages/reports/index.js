import ErrorList from "@/components/ErrorList";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const Reports = () => {
  return (
    <>
      <Head>
        <title> Dashboard | Error Reports </title>
        <meta
          name="description"
          content="A dashboard for project error reports."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} mainContent`}>
        <h1>Error Reports List</h1>
        <section className="errorList">
          <ErrorList />
        </section>
      </main>
    </>
  );
};

export default Reports;
