import type { IweatherForecast } from "@/types/weatherForecast";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { weatherService } from "@/services/weather/weatherService";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/services/weather/types";

export default function WeatherForecast({ title }: IweatherForecast) {
  const [hourlyData, setHourlyData] = useState<WeatherData["hourly"] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await weatherService.getHourlyForecast();
      setHourlyData(data);
    };
    fetchData();
  }, []);

  if (!hourlyData) return null;

  const forecastData = hourlyData.time.map((time, index) => [
    new Date(time).getTime(),
    hourlyData.temperature_2m[index],
  ]);

  const currentTime = new Date().getTime();

  const options = {
    title: {
      text: "Hourly Temperature Forecast",
    },
    subtitle: {
      text: "Dotted line indicates forecast",
    },
    xAxis: {
      type: "datetime",
      plotLines: [
        {
          color: "#4840d6",
          width: 2,
          value: currentTime,
          zIndex: 2,
          dashStyle: "Dash",
          label: {
            text: "Current time",
            rotation: 0,
            y: 20,
            style: {
              color: "#333333",
            },
          },
        },
      ],
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      valueSuffix: "°C",
    },
    series: [
      {
        name: "Temperature",
        data: forecastData,
        zoneAxis: "x",
        lineWidth: 4,
        marker: {
          lineWidth: 2,
          lineColor: "#4840d6",
          fillColor: "#fff",
        },
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#fa4fed"],
            [1, "#5897ff"],
          ],
        },
        zones: [
          {
            value: currentTime,
          },
          {
            dashStyle: "Dot",
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-1">
      <h6 className="text-xs text-gray-500">{title}</h6>
      <div className="w-full bg-white rounded-[2px]">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
