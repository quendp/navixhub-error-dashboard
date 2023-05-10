import styles from "@/styles/App.module.scss";

const Pagination = ({ changePageHandler, results }: any) => {
  const onPrev = () => {
    changePageHandler(results.current_page - 1);
  };

  const onNext = () => {
    changePageHandler(results.current_page + 1);
  };

  const onFirst = () => {
    changePageHandler(1);
  };

  const onLast = () => {
    changePageHandler(results.last_page);
  };

  return (
    <div className={styles.paginationBtns}>
      <button disabled={results.prev_page_url ? false : true} onClick={onPrev}>
        Prev
      </button>
      <button onClick={onFirst}>First</button>
      <span>
        {results.current_page} / {results.last_page}
      </span>
      <button onClick={onLast}>Last</button>
      <button disabled={results.next_page_url ? false : true} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
