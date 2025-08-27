import type { IweatherForecast } from "@/types/weatherForecast";

export default function WeatherForecast({ title }: IweatherForecast) {
  return (
    <div className="space-y-1">
      <h6 className="text-xs text-gray-500">{title}</h6>
      <div className="w-full h-[100px] bg-black opacity-5 rounded-[2px]">
        <span className="opacity-30">Graph here</span>
      </div>
    </div>
  );
}
