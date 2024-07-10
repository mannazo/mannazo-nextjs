import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartData = {
  series: number[];
  options: {
    chart: {
      type:
        | "donuft"
        | "line"
        | "area"
        | "bar"
        | "pie"
        | "radialBar"
        | "scatter"
        | "bubble"
        | "heatmap"
        | "candlestick"
        | "boxPlot"
        | "radar"
        | "polarArea"
        | "rangeBar"
        | "rangeArea"
        | "treemap"
        | undefined;
      height: number;
      fontFamily: string;
    };
    labels: string[];
    dataLabels: {
      enabled: boolean;
    };

    title: {
      text: string;
    };
  };
};

const ChartThree: React.FC = () => {
  const [userData, setUserData] = useState<
    { country: string; users: number }[]
  >([]);

  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    options: {
      chart: {
        type: "donut",
        height: 350,
        fontFamily: "Satoshi, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },

      labels: [],
      title: {
        text: "Number of Users by Country",
      },
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get<UserData[]>("/api/users");
        const data = [
          { country: "USA", users: 100 },
          { country: "Canada", users: 80 },
          { country: "UK", users: 70 },
          { country: "Germany", users: 60 },
          { country: "France", users: 50 },
        ];
        setUserData(data);
        const countries = data.map((item) => item.country);
        const users = data.map((item) => item.users);

        setChartData((prevChartData) => ({
          series: users,
          options: {
            ...prevChartData.options,
            labels: countries,
          },
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ">
      {/*sm:px-7.5 xl:col-span-5*/}
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Visitors Analytics
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            // label={labels}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {userData.map(({ country, users }) => (
          <div className="w-full px-8">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {country} </span>
                <span> {users} </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
