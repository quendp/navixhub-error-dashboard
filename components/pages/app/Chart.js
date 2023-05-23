import { ResponsiveLine } from "@nivo/line";
import Image from "next/image";
import { useEffect, useState } from "react";

const Chart = ({ reports }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  useEffect(() => {
    let newMonthlyReps = [];
    for (let i in reports) {
      const report = {
        x: i,
        y: reports[i],
      };
      newMonthlyReps = [...newMonthlyReps, report];
    }
    const sortedData = [
      {
        id: "reports",
        data: [...newMonthlyReps].reverse(),
      },
    ];
    setMonthlyData(sortedData);
  }, [reports]);
  return (
    <div className="chartWrapper">
      {monthlyData.length > 0 ? (
        <ResponsiveLine
          colors={() => "rgb(226, 188, 104)"}
          data={monthlyData}
          margin={{ top: 30, right: 30, bottom: 70, left: 70 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "month",
            legendOffset: 50,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Report Count",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          theme={{
            text: {
              fontSize: 11,
              fill: "rgb(235, 230, 230)",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
            axis: {
              legend: {
                text: {
                  fontSize: 12,
                  fill: "rgb(226, 188, 104)",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
              ticks: {
                text: {
                  fontSize: 11,
                  fill: "rgb(180, 180, 180)",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
            },
            grid: {
              line: {
                stroke: "rgb(73, 72, 72)",
                strokeWidth: 1,
              },
            },
            tooltip: {
              container: {
                background: "rgb(73, 72, 72)",
                fontSize: 12,
              },
              basic: {},
              chip: {},
              table: {},
              tableCell: {},
              tableCellValue: {},
            },
          }}
        />
      ) : (
        <Image src="/loader.svg" width={30} height={30} alt="loader image" />
      )}
    </div>
  );
};

export default Chart;
