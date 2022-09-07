import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { default as api } from "../store/apiSlice";
import { chart_data, getTotal } from "../helper/helper";
Chart.register(ArcElement);

export default function Graph() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let graphData;
  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chart_data(data)}></Doughnut>;
  } else if (isError) {
    graphData = <div>Error Fetching</div>;
  }
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          <h3 className="mb-4 front-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              ${getTotal(data)}{" "}
            </span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* Labels */}
          <Labels></Labels>
        </div>
      </div>
    </div>
  );
}
