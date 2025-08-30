import { Card, CardContent, CardTitle } from "../ui/card";
import WeatherForecast from "./WeatherForecast";
import { useEffect, useState } from "react";
import { getHourlyForecastData } from "@/services/weather.api";

interface WeatherData {
  temperature: [number, number][];
  humidity: [number, number][];
  cloudCover: [number, number][];
  rain: [number, number][];
  currentTime: number;
}

export default function Forecastings() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: [],
    humidity: [],
    cloudCover: [],
    rain: [],
    currentTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHourlyForecastData();
      setWeatherData(data);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardTitle>
        <h5 className="px-6 text-xs text-gray-500 font-medium">
          Future Forecast
        </h5>
      </CardTitle>
      <CardContent className="space-y-5">
        <WeatherForecast title="Forecasted data" weatherData={weatherData} />
      </CardContent>
    </Card>
  );
}
