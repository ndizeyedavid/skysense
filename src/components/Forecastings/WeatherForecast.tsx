import type { IweatherForecast } from "@/types/weatherForecast";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface WeatherData {
  temperature: [number, number][];
  rainfall: [number, number][];
  pressure: [number, number][];
  humidity: [number, number][];
  currentTime: number;
}

interface WeatherForecastProps extends IweatherForecast {
  weatherData: WeatherData;
}

export default function WeatherForecast({ weatherData }: WeatherForecastProps) {
  const createChartOptions = (
    metric: string,
    data: [number, number][],
    unit: string,
    color: string
  ) => ({
    title: {
      text: `${metric} Prediction`,
      style: { fontSize: "14px" },
      margin: 15,
    },
    subtitle: {
      text: "ML model predictions",
      style: { fontSize: "11px" },
    },
    chart: {
      height: "280px",
      spacingBottom: 10,
      spacingTop: 10,
      style: {
        fontFamily: "inherit",
      },
    },
    xAxis: {
      type: "datetime",
      plotLines: [
        {
          color: "#4840d6",
          width: 2,
          value: weatherData.currentTime,
          zIndex: 2,
          dashStyle: "Dash",
          label: {
            text: "Current time",
            rotation: 0,
            y: 20,
            style: { color: "#333333" },
          },
        },
      ],
    },
    yAxis: { title: { text: unit } },
    legend: { enabled: false },
    tooltip: { valueSuffix: unit },
    series: [
      {
        name: metric,
        data: data,
        zoneAxis: "x",
        lineWidth: 4,
        marker: {
          lineWidth: 2,
          lineColor: "#4840d6",
          fillColor: "#fff",
        },
        color: color,
        zones: [{ value: weatherData.currentTime }, { dashStyle: "Dot" }],
      },
    ],
  });

  const charts = [
    {
      metric: "Temperature",
      data: weatherData.temperature,
      unit: "°C",
      color: "#fa4fed",
    },
    {
      metric: "Rainfall",
      data: weatherData.rainfall,
      unit: "mm",
      color: "#41c9f5",
    },
    {
      metric: "Pressure",
      data: weatherData.pressure,
      unit: "hPa",
      color: "#8c54ff",
    },
    {
      metric: "Humidity",
      data: weatherData.humidity,
      unit: "%",
      color: "#00b894",
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {charts.map((chart, index) => (
        <div key={index} className="space-y-1">
          <h6 className="text-[10px] sm:text-xs text-gray-500 px-2">
            {chart.metric}
          </h6>
          <div className="w-full bg-white rounded-[2px] px-1 sm:px-2">
            <HighchartsReact
              highcharts={Highcharts}
              options={createChartOptions(
                chart.metric,
                chart.data,
                chart.unit,
                chart.color
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
