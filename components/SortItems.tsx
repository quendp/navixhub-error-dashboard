import styles from "@/styles/App.module.scss";

const SortItems = ({ onSortLatest }: any) => {
  const onClickSort = () => {
    onSortLatest();
  };

  return (
    <button className={styles.sortButton} onClick={onClickSort}>
      Show Latest
    </button>
  );
};

export default SortItems;
