import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  Snowflake,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import type { ICurrentWeather } from "@/types/currentWeather";

interface WeatherStatusInfo {
  status: string;
  icon: typeof CloudSun;
  color: string;
}

const getWeatherStatus = (props: ICurrentWeather): WeatherStatusInfo => {
  const { temperature, precipitation, rain } = props;

  if (rain > 0) {
    return {
      status: rain > 10 ? "Heavy Rain" : "Light Rain",
      icon: rain > 10 ? CloudRain : CloudDrizzle,
      color: "#4A90E2",
    };
  }

  if (precipitation > 0) {
    return {
      status: precipitation > 5 ? "Heavy Precipitation" : "Light Precipitation",
      icon: Cloud,
      color: "#8E9AAF",
    };
  }

  if (temperature <= 0) {
    return {
      status: "Freezing",
      icon: Snowflake,
      color: "#B4D7F7",
    };
  } else if (temperature >= 30) {
    return {
      status: "Very Hot",
      icon: Sun,
      color: "#FF6B6B",
    };
  } else if (temperature >= 25) {
    return {
      status: "Hot",
      icon: Sun,
      color: "#FFA07A",
    };
  } else if (temperature >= 20) {
    return {
      status: "Warm",
      icon: CloudSun,
      color: "#FFB74D",
    };
  } else if (temperature >= 15) {
    return {
      status: "Mild",
      icon: CloudSun,
      color: "#e5e7ea",
    };
  } else if (temperature >= 10) {
    return {
      status: "Cool",
      icon: Cloud,
      color: "#90CAF9",
    };
  } else {
    return {
      status: "Cold",
      icon: Snowflake,
      color: "#64B5F6",
    };
  }
};

export default function CurrentWeather({
  temperature,
  apparentTemp,
  precipitation,
  highTemp,
  lowTemp,
  rain,
  maxPrecipitation,
}: ICurrentWeather) {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 lg:gap-24">
        <div className="space-y-2">
          <h3 className="text-[32px] sm:text-[40px] lg:text-[50px]">
            {temperature}°C
          </h3>
          {/* aux text */}
          <div className="space-y-2 text-gray-400 text-xs sm:text-sm">
            <p>
              Apparent Temp:{" "}
              <span className=" dark:text-white text-black font-bold">
                {apparentTemp}°
              </span>
            </p>
            <p>
              Precipitation:{" "}
              <span className="dark:text-white text-black font-bold">
                {precipitation} mm
              </span>
            </p>
            <p>
              Max Precipitation{" "}
              <span className="dark:text-white text-black font-bold">
                {maxPrecipitation} %
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-[40px] lg:mt-[70px] space-y-2 sm:space-y-3">
          {/* Day status */}
          <h3 className="text-xs sm:text-sm font-medium">
            {
              getWeatherStatus({
                temperature,
                apparentTemp,
                precipitation,
                highTemp,
                lowTemp,
                rain,
                maxPrecipitation,
              }).status
            }
          </h3>
          {/* aux text */}
          <div className="space-y-2 text-gray-400 text-xs sm:text-sm">
            <p>
              High:{" "}
              <span className="dark:text-white text-black font-bold">
                {highTemp}°
              </span>
              , Low:{" "}
              <span className="dark:text-white text-black font-bold">
                {lowTemp}°
              </span>
            </p>
            <p>
              Rain:{" "}
              <span className="dark:text-white text-black font-bold">
                {rain} mm
              </span>
            </p>
          </div>
        </div>

        {/* status icon */}
        <div className="relative">
          {(() => {
            const { icon: WeatherIcon, color } = getWeatherStatus({
              temperature,
              apparentTemp,
              precipitation,
              highTemp,
              lowTemp,
              rain,
              maxPrecipitation,
            });
            return (
              <WeatherIcon
                className="absolute hidden size-[100px] lg:block right-0 sm:-right-2 top-0 sm:-top-3"
                // className="absolute size-[60px] sm:size-[80px] lg:size-[100px] right-0 sm:-right-2 top-0 sm:-top-3"
                style={{ color }}
              />
            );
          })()}
        </div>
      </CardContent>
    </Card>
  );
}
