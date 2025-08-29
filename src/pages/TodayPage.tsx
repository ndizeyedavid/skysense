import CircularProgressBar from "@/components/CircularProgressBar";
import CurrentMapView from "@/components/CurrentMapView";
import CurrentWeather from "@/components/CurrentWeather";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import WeatherCard from "@/components/WeatherCard";
import { getCurrentWeather } from "@/services/weather.api";
import type { IWeatherCard } from "@/types/weatherCard";
import {
  AlignVerticalJustifyCenterIcon,
  CloudSun,
  Navigation2,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TodayPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWeatherData, setCurrentWeatherData] = useState<any>({});
  useEffect(() => {
    (async () => {
      try {
        const res = await getCurrentWeather();

        console.log(res);
        setCurrentWeatherData(res);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const weatherData: IWeatherCard[] = [
    {
      title: "Wind Chill",
      value: `${(currentWeatherData?.wind_direction_10m / 17).toFixed(1)}°`,
      desc: "Cold relative to wind",
      icon: "wind",
      background: "",
    },
    {
      title: "Heat Index",
      value: `${currentWeatherData?.temperature_2m}°`,
      desc: "Heat relative to % Humidity",
      icon: "heat",
      background: "/assets/images/heat.png",
    },
    {
      title: "Sea level Pressure",
      value: `${currentWeatherData?.pressure_msl} hPa`,
      desc: "",
      icon: "visibility",
      background: "/assets/images/visibility.png",
    },
    {
      title: "Cloud cover",
      value: `${currentWeatherData?.cloud_cover}%`,
      desc: "",
      icon: "clod",
      background: "/assets/images/cloud.png",
    },
  ];

  return (
    <section className="px-7 py-8 space-y-5">
      {loading && "Loading...."}
      <Header />
      <div className="grid grid-cols-2 gap-4">
        <CurrentWeather
          temperature={currentWeatherData?.temperature_2m}
          apparentTemp={currentWeatherData?.apparent_temperature}
          precipitation={currentWeatherData?.precipitation}
          highTemp={currentWeatherData?.temperature_2m_max}
          lowTemp={currentWeatherData?.temperature_2m_min}
          rain={currentWeatherData?.rain}
          maxPrecipitation={currentWeatherData?.precipitation_probability_max}
        />

        <CurrentMapView />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {weatherData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Card
          style={{
            backgroundImage: "url('/assets/images/windDirection.png')",
            backgroundSize: "contain",
            backgroundPosition: "right bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <CardHeader>
            <Wind className="size-[20px] opacity-30" />
            <span className="text-sm text-gray-600">Wind</span>
          </CardHeader>

          <CardFooter className="grid grid-cols-2">
            <div className="text-xs space-y-3">
              <div>
                <span className="text-sm font-medium">
                  {currentWeatherData?.wind_speed_10m} km/h
                </span>
                <h5 className="text-gray-600">Speed</h5>
              </div>

              <div>
                <span className="text-sm font-medium">
                  {currentWeatherData?.wind_gusts_10m} km/h
                </span>
                <h5 className="text-gray-600">Gust</h5>
              </div>
            </div>

            <div className="space-y-3 mt-2">
              <Navigation2
                className="size-[30px]"
                fill="#d2e3fc"
                stroke="#d2e3fc"
                style={{
                  transform: `rotate(${currentWeatherData?.wind_direction_10m}deg)`,
                }}
              />

              <div className="text-xs">
                <span className=" font-medium">
                  {currentWeatherData?.wind_direction_10m}°
                </span>
                <h5 className="text-gray-600">Direction</h5>
              </div>
            </div>
          </CardFooter>
        </Card>

        <WeatherCard
          title="Relative Humidity"
          value={`${currentWeatherData?.relative_humidity_2m}%`}
          desc={`The dew point is currently ${currentWeatherData?.precipitation}°`}
          icon="humidity"
          background="/assets/images/humidity.png"
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <CloudSun className="size-[20px] text-yellow-400" />
              <span className="text-sm text-gray-600">Overall Temperature</span>
            </div>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <CircularProgressBar
              progress={(currentWeatherData?.temperature_2m / 35) * 100}
              text={currentWeatherData?.temperature_2m}
            />
          </CardContent>

          <CardFooter className="flex h-full items-end justify-center w-full">
            <span className="text-xs text-gray-600 text-center">
              The intensity of the ultraviolet radiation from the sun.
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <AlignVerticalJustifyCenterIcon className="size-[20px] opacity-40" />
              <span className="text-sm text-gray-600">Air Pressure</span>
            </div>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <CircularProgressBar
              progress={(currentWeatherData?.surface_pressure / 1026) * 100}
              text={`${currentWeatherData?.surface_pressure}`}
            />
          </CardContent>

          <CardFooter className="flex gap-2 flex-col items-center justify-center w-full">
            <h3 className="text-xl text-gray-600">hPa</h3>
            <span className="text-xs text-gray-600 text-center">
              Mean Sea Level Millibars
            </span>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
