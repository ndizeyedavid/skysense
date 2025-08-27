import { CloudSun } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { weatherService } from "@/services/weather/weatherService";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/services/weather/types";

export default function CurrentWeather() {
  const [currentWeather, setCurrentWeather] = useState<
    WeatherData["current"] | null
  >(null);
  const [dailyForecast, setDailyForecast] = useState<
    WeatherData["daily"] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const current = await weatherService.getCurrentWeather();
      const daily = await weatherService.getDailyForecast();
      setCurrentWeather(current);
      setDailyForecast(daily);
    };
    fetchData();
  }, []);

  if (!currentWeather || !dailyForecast) return null;

  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-24">
        <div className="space-y-2">
          <h3 className="text-[50px]">{currentWeather.temperature_2m}°C</h3>
          {/* aux text */}
          <div className="space-y-2 text-gray-400 text-sm">
            <p>
              Humidity:{" "}
              <span className="text-black font-bold">
                {currentWeather.relative_humidity_2m}%
              </span>
            </p>
            <p>
              Wind Speed:{" "}
              <span className="text-black font-bold">
                {currentWeather.wind_speed_10m} km/h
              </span>
            </p>
            <p>
              Rain:{" "}
              <span className="text-black font-bold">
                {currentWeather.rain} mm
              </span>
            </p>
          </div>
        </div>

        <div className="mt-[50px] space-y-2">
          {/* Day status */}
          <h3 className="text-sm font-medium">
            {currentWeather.cloud_cover > 50 ? "Cloudy" : "Clear"}
          </h3>
          {/* aux text */}
          <div className="space-y-2 text-gray-400 text-sm">
            <p>
              High:{" "}
              <span className="text-black font-bold">
                {dailyForecast.temperature_2m_max[0]}°
              </span>
            </p>
            <p>
              Pressure:{" "}
              <span className="text-black font-bold">
                {currentWeather.surface_pressure} hPa
              </span>
            </p>
            <p>
              Cloud Cover:{" "}
              <span className="text-black font-bold">
                {currentWeather.cloud_cover}%
              </span>
            </p>
          </div>
        </div>

        {/* status icon */}
        <div className="relative">
          <CloudSun className="absolute size-[100px] opacity-40 -right-2 -top-3" />
        </div>
      </CardContent>
    </Card>
  );
}
