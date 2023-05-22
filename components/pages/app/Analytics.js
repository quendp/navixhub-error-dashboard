import Image from "next/image";
import { useEffect, useState } from "react";

const Analytics = ({ monthlyReports }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  useEffect(() => {
    let newMonthlyReps = [];
    for (let i in monthlyReports) {
      const report = {
        month: i,
        count: monthlyReports[i],
      };
      newMonthlyReps = [...newMonthlyReps, report];
    }
    for (let i = 0; i < newMonthlyReps.length; i++) {
      newMonthlyReps[i] = {
        ...newMonthlyReps[i],
        percentage:
          i < newMonthlyReps.length - 1
            ? (
                ((newMonthlyReps[i + 1].count - newMonthlyReps[i].count) /
                  newMonthlyReps[i + 1].count) *
                100
              ).toFixed(0)
            : "0",
      };
    }
    setMonthlyData(newMonthlyReps);
  }, [monthlyReports]);

  console.log(monthlyReports);
  console.log(monthlyData);
  return (
    <div className="overviewAnalytics">
      <h4>Monthly Analytics</h4>

      {monthlyData.length > 0 &&
        monthlyData.map((data) => (
          <p key={data.month}>
            <span> {data.month} </span>
            <span>
              {data.count} error{data.count > 1 ? "s" : ""}
            </span>
            <span className={`${data.percentage > 0 ? "red" : "green"}`}>
              <Image
                src={`/arrow-${data.percentage <= 0 ? "up" : "down"}-solid.svg`}
                width={15}
                height={15}
                alt="Arrow icon"
              />
              {Math.abs(data.percentage)}%
            </span>
          </p>
        ))}
    </div>
  );
};

export default Analytics;
