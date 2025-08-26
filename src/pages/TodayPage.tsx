import CurrentMapView from "@/components/CurrentMapView";
import CurrentWeather from "@/components/CurrentWeather";
import Header from "@/components/Header";
import WeatherCard from "@/components/WeatherCard";
import type { IWeatherCard } from "@/types/weatherCard";

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
      <div className="grid grid-cols-2 gap-3">
        <CurrentWeather />
        <CurrentMapView />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {weatherData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </div>
    </section>
  );
}
