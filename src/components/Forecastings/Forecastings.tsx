import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
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
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: [],
    humidity: [],
    cloudCover: [],
    rain: [],
    currentTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHourlyForecastData();
        setWeatherData(data);
      } finally {
        setLoading(false);
      }
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
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ) : (
          <WeatherForecast title="Forecasted data" weatherData={weatherData} />
        )}
      </CardContent>
    </Card>
  );
}
