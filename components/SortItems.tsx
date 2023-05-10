import styles from "@/styles/App.module.scss";

const SortItems = ({ sortLatest }: any) => {
  const onClickSort = () => {
    sortLatest();
  };

  return (
    <button className={styles.sortButton} onClick={onClickSort}>
      Show Latest
    </button>
  );
};

export default SortItems;
