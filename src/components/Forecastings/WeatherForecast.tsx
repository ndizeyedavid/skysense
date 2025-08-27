import type { IweatherForecast } from "@/types/weatherForecast";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function WeatherForecast({ title }: IweatherForecast) {
  // Mock data generation
  const today = new Date();
  const mockData = Array.from({ length: 10 }, (_, i) => {
    const time = new Date(today);
    time.setHours(time.getHours() + i);
    return [
      time.getTime(),
      Math.round((Math.random() * 5 + 15) * 10) / 10, // Random temps between 15-20°C
    ];
  });

  const currentTime = today.getTime() - today.getTimezoneOffset() * 60 * 1000;

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
        data: mockData,
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
