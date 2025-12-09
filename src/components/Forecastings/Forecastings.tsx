import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import WeatherForecast from "./WeatherForecast";
import { useEffect, useState } from "react";
import { makePredictions } from "@/services/weather.api";

interface PredictionData {
  timestamp: string;
  rainfall: number;
  pressure: number;
  temperature: number;
  humidity: number;
}

interface WeatherData {
  temperature: [number, number][];
  rainfall: [number, number][];
  pressure: [number, number][];
  humidity: [number, number][];
  currentTime: number;
}

export default function Forecastings() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: [],
    rainfall: [],
    pressure: [],
    humidity: [],
    currentTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictionData: PredictionData[] = await makePredictions();

        // Transform prediction data to match WeatherData format
        const transformedData: WeatherData = {
          temperature: predictionData.map((item) => [
            new Date(item.timestamp).getTime(),
            item.temperature,
          ]),
          rainfall: predictionData.map((item) => [
            new Date(item.timestamp).getTime(),
            item.rainfall,
          ]),
          pressure: predictionData.map((item) => [
            new Date(item.timestamp).getTime(),
            item.pressure,
          ]),
          humidity: predictionData.map((item) => [
            new Date(item.timestamp).getTime(),
            item.humidity,
          ]),
          currentTime: Date.now(),
        };

        setWeatherData(transformedData);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
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
          ML Predictions
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
          <WeatherForecast title="Predicted data" weatherData={weatherData} />
        )}
      </CardContent>
    </Card>
  );
}
