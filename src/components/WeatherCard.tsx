import { Cloud, SunDim, Thermometer, Waves, Wind } from "lucide-react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import type { IWeatherCard } from "@/types/weatherCard";
import type React from "react";

function renderIcon(icon: string) {
  switch (icon) {
    case "wind":
      return <Wind className="size-[20px] opacity-30" />;
    case "heat":
      return <Thermometer className="size-[20px] opacity-80 text-red-600" />;
    case "visibility":
      return <Waves className="size-[20px] opacity-30" />;
    case "cloud":
      return <Cloud className="size-[20px] opacity-30" />;
    case "humidity":
      return <Waves className="size-[20px] opacity-80 text-blue-600" />;
    default:
      return <SunDim className="size-[20px] opacity-30" />;
  }
}

export default function WeatherCard({
  title,
  value,
  desc,
  icon,
  background,
}: IWeatherCard) {
  return (
    <Card
      style={{
        backgroundImage: `url('${background}')`,
        backgroundSize: "contain",
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardHeader>
        {renderIcon(icon) as React.ReactNode}
        <span className="text-sm text-gray-600">{title}</span>
      </CardHeader>

      <CardFooter className="block">
        <h3 className={`text-[${desc == "" ? "40px" : "30px"}]`}>{value}</h3>
        <span className="text-xs text-gray-400">{desc}</span>
      </CardFooter>
    </Card>
  );
}
