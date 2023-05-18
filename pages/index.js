import Head from "next/head";
import Overview from "@/components/pages/app/Overview";
import { Inter } from "next/font/google";

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
        <Overview />
      </main>
    </>
  );
}
