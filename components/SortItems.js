const SortItems = ({ onSortLatest }) => {
  const onClickSort = () => {
    onSortLatest();
  };

  return (
    <button className="sortButton" onClick={onClickSort}>
      Show Latest
    </button>
  );
};

export default SortItems;
