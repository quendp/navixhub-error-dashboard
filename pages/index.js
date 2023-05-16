import Head from "next/head";
import { Inter } from "next/font/google";
import ErrorList from "@/components/ErrorList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <h1>Navix Hub Error Reports</h1>
        <section className="errorList">
          <ErrorList />
        </section>
      </main>
    </>
  );
}
