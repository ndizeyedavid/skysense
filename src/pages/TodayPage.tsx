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
import type { IWeatherCard } from "@/types/weatherCard";
import {
  AlignVerticalJustifyCenterIcon,
  CloudSun,
  Navigation2,
  Wind,
} from "lucide-react";

export default function TodayPage() {
  const weatherData: IWeatherCard[] = [
    {
      title: "Wind Chill",
      value: "27°",
      desc: "Cold relative to wind",
      icon: "wind",
      background: "",
    },
    {
      title: "Heat Index",
      value: "28°",
      desc: "Heat relative to % Humidity",
      icon: "heat",
      background: "/assets/images/heat.png",
    },
    {
      title: "Visibility",
      value: "16km",
      desc: "",
      icon: "visibility",
      background: "/assets/images/visibility.png",
    },
    {
      title: "Cloud cover",
      value: "96%",
      desc: "",
      icon: "clod",
      background: "/assets/images/cloud.png",
    },
  ];

  return (
    <section className="px-7 py-8 space-y-5">
      <Header />
      <div className="grid grid-cols-2 gap-4">
        <CurrentWeather />
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
                <span className="text-sm font-medium">10 km/h</span>
                <h5 className="text-gray-600">Speed</h5>
              </div>

              <div>
                <span className="text-sm font-medium">19 km/h</span>
                <h5 className="text-gray-600">Gust</h5>
              </div>
            </div>

            <div className="space-y-3 mt-2">
              <Navigation2
                className="size-[30px]"
                fill="#d2e3fc"
                stroke="#d2e3fc"
                style={{
                  transform: "rotate(0deg)",
                }}
              />

              <div className="text-xs">
                <span className=" font-medium">90°E</span>
                <h5 className="text-gray-600">Direction</h5>
              </div>
            </div>
          </CardFooter>
        </Card>

        <WeatherCard
          title="Relative Humidity"
          value="41%"
          desc="The dew point is currently 15.9"
          icon="humidity"
          background="/assets/images/humidity.png"
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <CloudSun className="size-[20px] text-yellow-400" />
              <span className="text-sm text-gray-600">UV Index</span>
            </div>
          </CardHeader>

          <CardContent className="flex items-center justify-center">
            <CircularProgressBar progress={75} />
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
            <CircularProgressBar progress={35} text="1016" />
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
