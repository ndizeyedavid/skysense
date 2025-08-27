import { Moon, Sunrise, ThermometerSunIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import DayForecast from "./DayForecast";
import ForecastDay from "./ForecastDay";

export default function ForeCastingMetrics() {
  return (
    <Card>
      <CardTitle>
        <h6 className="px-6 text-xs text-gray-500 font-medium">
          Daily Forecast(10 days)
        </h6>
      </CardTitle>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-8 gap-3">
          <ForecastDay />
          <ForecastDay />
          <ForecastDay />
          <ForecastDay />
          <ForecastDay />
          <ForecastDay />
          <ForecastDay />
          <ForecastDay />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DayForecast />
          <DayForecast />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* max - min temps */}
          <Card className="bg-[#669df6] text-white/80">
            <CardContent className="text-sm flex items-center justify-between">
              <h3>
                Max: <span className="text-white">33°</span>
              </h3>
              <h3>
                Min: <span className="text-white">33°</span>
              </h3>
              <div className="flex items-center gap-2">
                <ThermometerSunIcon /> <span className="text-white">33°</span>
              </div>
            </CardContent>
          </Card>

          {/* sunrise - sunset */}
          <Card className="bg-[#669df6] text-white/80">
            <CardContent className="text-xs flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-white">06:07</span>-
                <Sunrise className="size-[20px]" />-
                <span className="text-white">19:16</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-white">09:27</span>-
                <Moon className="size-[20px]" />-
                <span className="text-white">20:55</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
