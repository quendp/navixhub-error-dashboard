import { useEffect, useState } from "react";

const ReportsStats = ({ title, parsedData }) => {
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    let dataList = [];
    for (let i in parsedData) {
      const data = {
        title: i,
        count: parsedData[i],
      };
      dataList = [...dataList, data];
    }
    const sortDataList = [...dataList].sort(arrSortFunc);
    setSortedData(sortDataList);
  }, [parsedData]);

  const arrSortFunc = (a, b) => {
    return b.count - a.count;
  };

  return (
    <div className="reportStatsWrapper">
      <h4> {title} </h4>
      {sortedData.length > 0 ? (
        sortedData.map(
          (report, idx) =>
            idx <= 4 && (
              <p key={report.title}>
                {idx + 1}. <span>{report.title}</span> - {report.count} reports
              </p>
            )
        )
      ) : (
        <p> No reports submitted.</p>
      )}
    </div>
  );
};

export default ReportsStats;
