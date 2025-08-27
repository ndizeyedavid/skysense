import { Cloud, CloudRain, Sun, Waves } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { weatherService } from "@/services/weather/weatherService";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/services/weather/types";

export default function DayForecast() {
  const [dailyForecast, setDailyForecast] = useState<
    WeatherData["daily"] | null
  >(null);
  const [currentWeather, setCurrentWeather] = useState<
    WeatherData["current"] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const daily = await weatherService.getDailyForecast();
      const current = await weatherService.getCurrentWeather();
      setDailyForecast(daily);
      setCurrentWeather(current);
    };
    fetchData();
  }, []);

  if (!dailyForecast || !currentWeather) return null;

  return (
    <Card className="bg-[#669df6] text-white">
      <CardTitle>
        <h5 className="px-4 text-xs text-white/80 font-medium">
          Daytime Forecast:
        </h5>
      </CardTitle>

      <CardContent className="space-y-5">
        <div className=" flex items-center gap-3 text-sm">
          <Sun className="size-[35px] p-2 text-yellow-300 bg-blue-800/20 rounded-full" />
          Partly Sunny
        </div>
        {/* rain */}

        <div className="text-sm flex items-center gap-2">
          <CloudRain />
          <span>{dailyForecast.precipitation_sum[0]}mm</span>
          <span>{currentWeather.rain} mm</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-xs flex items-center gap-3">
          <Waves />
          <span>{currentWeather.relative_humidity_2m}%</span>
        </div>

        <div className="text-xs flex items-center gap-3">
          <Cloud />
          <span>{currentWeather.cloud_cover}%</span>
        </div>

        <div className="text-xs flex items-center gap-3">
          <Sun />
          <span>UV-{Math.round(dailyForecast.uv_index_max[0])}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
