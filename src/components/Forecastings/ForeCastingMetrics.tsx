import { Moon, Sunrise, ThermometerSunIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import DayForecast from "./DayForecast";
import ForecastDay from "./ForecastDay";
import { useEffect, useState } from "react";
import { getDayForecastedData } from "@/services/weather.api";

export default function ForeCastingMetrics() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDayForecastedData();
      setForecastData(data);
    };
    fetchData();
  }, []);

  if (!forecastData) return null;

  const getDayName = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <Card>
      <CardTitle>
        <h6 className="px-3 sm:px-6 text-[10px] sm:text-xs text-gray-500 font-medium">
          Daily Forecast(7 days)
        </h6>
      </CardTitle>

      <CardContent className="space-y-2 sm:space-y-3">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
          {forecastData.time.map((time: Date, index: number) => (
            <ForecastDay
              key={time.toISOString()}
              day={index === 0 ? "Today" : getDayName(time)}
              date={formatDate(time)}
              status={
                forecastData.precipitation_probability_max[index] > 50
                  ? "rainy"
                  : "sunny"
              }
              temp={Math.round(forecastData.temperature_2m_max[index])}
              precipitation_probability={
                forecastData.precipitation_probability_max[index]
              }
              rain_sum={forecastData.rain_sum[index]}
              onSelect={setSelectedDay}
              index={index}
              selected={selectedDay === index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <DayForecast
            title="Daytime Forecast"
            status={
              forecastData.precipitation_probability_max[selectedDay] > 50
                ? "Rainy"
                : "Sunny"
            }
            rainPercent={
              forecastData.precipitation_probability_max[selectedDay]
            }
            raintMM={forecastData.rain_sum[selectedDay]}
            visibility={
              100 -
              (forecastData.precipitation_probability_max[selectedDay] || 0)
            }
            cloudCoverage={
              forecastData.precipitation_probability_max[selectedDay] || 0
            }
            UV={forecastData.uv_index_clear_sky_max[selectedDay]}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-700 text-white/80">
            <CardContent className="text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between space-y-2 sm:space-y-0">
              <h3>
                Max:{" "}
                <span className="text-white">
                  {Math.round(forecastData.temperature_2m_max[selectedDay])}°
                </span>
              </h3>
              <h3>
                Min:{" "}
                <span className="text-white">
                  {Math.round(forecastData.temperature_2m_min[selectedDay])}°
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <ThermometerSunIcon />
                <span className="text-white">
                  {Math.round(
                    (forecastData.temperature_2m_max[selectedDay] +
                      forecastData.temperature_2m_min[selectedDay]) /
                      2
                  )}
                  °
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-700 text-white/80">
            <CardContent className="text-[10px] sm:text-xs flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center gap-1">
                <Sunrise className="size-[20px]" />-
                <span className="text-white">
                  {formatTime(forecastData.sunrise[selectedDay])}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Moon className="size-[20px]" />-
                <span className="text-white">
                  {formatTime(forecastData.sunset[selectedDay])}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
