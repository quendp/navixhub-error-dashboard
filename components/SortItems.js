const SortItems = ({ onGetLatest }) => {
  const onClickSort = () => {
    onGetLatest();
  };

  return (
    <button className="sortButton" onClick={onClickSort}>
      Show Latest
    </button>
  );
};

export default SortItems;
