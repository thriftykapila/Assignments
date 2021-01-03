import React, { useEffect, useState } from "react";
import { scaleTime } from "d3-scale";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { utcDay } from "d3-time";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";

let ChartJS = (props) => {
  const { type, width, ratio } = props;
  const [data, setData] = useState([
    {
      date: new Date("2020-01-01 00:00:00"),
      open: 33,
      high: 33.5,
      low: 32.98,
      close: 33.4,
      volume: 594858493,
    },
    {
      date: new Date("2020-01-02 00:00:00"),
      open: 33.4,
      high: 35,
      low: 31,
      close: 32.4,
      volume: 594858443,
    },
  ]);

  const xAccessor = (d) => {
    // console.log(d.date, "ddddddddddddddddd");
    return d.date;
  };

  useEffect(() => {
    let updated = [];
    fetch("http://kaboom.rksv.net/api/historical?interval=1")
      .then((response) => response.json())
      .then((data) => {
        data.map((ele) => {
          let now = ele.split(",");
          // let now = new Date((ele.split(",")[0])*1000)
          console.log(now, "nowwwwwww");
          updated.push({
            date: new Date(parseInt(now[0])),
            open: parseInt(now[1]),
            high: parseInt(now[2]),
            low: parseInt(now[3]),
            close: parseInt(now[4]),
            volume: parseInt(now[5]),
          });
        });

        console.log(updated, "updated");
        updated.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.date) - new Date(b.date);
        });

        console.log(updated, "updated");
        setData(updated);
      })
      .catch((err) => console.log(err));
  }, []);

  if (data == null) {
    return <div>Loading...</div>;
  }

  // const start = xAccessor(last(data));
  // const end = xAccessor(data[Math.max(0, data.length - 150)]);
  // const xExtents = [start, end];

  return (
    <div className="ChartJS">
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        data={data}
        seriesName="MSFT"
        xAccessor={xAccessor}
        xScale={scaleTime()}
        // displayXAccessor={displayXAccessor}
        // xExtents={xExtents}
        xExtents={[new Date(2009, 0, 30), new Date(2022, 11, 16)]}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

ChartJS.defaultProps = {
  type: "svg",
};

ChartJS = fitWidth(ChartJS);

export default ChartJS;
