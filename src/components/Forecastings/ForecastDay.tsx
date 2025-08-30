import type { IForecastDay } from "@/types/forecastDay";
import { Cloud, CloudRain, Sun, Snowflake } from "lucide-react";

interface ExtendedForecastDay extends IForecastDay {
  precipitation_probability: number;
  rain_sum: number;
  onSelect: (index: number) => void;
  index: number;
  selected?: boolean;
}

export default function ForecastDay({
  day,
  date,
  status,
  temp,
  precipitation_probability,
  rain_sum,
  onSelect,
  index,
  selected,
}: ExtendedForecastDay) {
  const getWeatherIcon = () => {
    if (rain_sum > 0) return CloudRain;
    if (precipitation_probability > 50) return Cloud;
    if (temp < 0) return Snowflake;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon();

  return (
    <div
      onClick={() => onSelect(index)}
      className={`${
        selected
          ? "bg-blue-700"
          : "bg-blue-500 opacity-70 hover:opacity-100 active:bg-blue-600"
      } transition-all cursor-pointer rounded-sm text-[10px] sm:text-xs text-center text-white py-2 sm:py-4 gap-2 sm:gap-4 flex items-center flex-col justify-between touch-manipulation select-none`}
    >
      <div className="text-center space-y-0.5 sm:space-y-1">
        <h5>{day}</h5>
        <h6>{date}</h6>
      </div>

      <div className="p-0.5 sm:p-1 bg-blue-800/20 rounded-full" title={status}>
        <WeatherIcon className="size-[18px] sm:size-[23px] text-yellow-300" />
      </div>

      <h3 className="text-[14px] sm:text-[16px] font-medium text-center">
        {temp}°
      </h3>
    </div>
  );
}
