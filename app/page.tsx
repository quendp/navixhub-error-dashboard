import ErrorList from "@/components/ErrorList";
import homeStyle from "@/styles/App.module.scss";

export default function Home() {
  return (
    <main className={homeStyle.mainContent}>
      <h1>Navix Hub Error Reports</h1>
      <section className={homeStyle.errorList}>
        <ErrorList />
      </section>
    </main>
  );
}
