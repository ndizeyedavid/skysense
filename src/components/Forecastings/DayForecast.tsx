import { Cloud, CloudRain, Sun, Waves } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";

export default function DayForecast() {
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
          <span>20%</span>
          <span>0.0 mm</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-xs flex items-center gap-3">
          <Waves />
          <span>33%</span>
        </div>

        <div className="text-xs flex items-center gap-3">
          <Cloud />
          <span>92%</span>
        </div>

        <div className="text-xs flex items-center gap-3">
          <Sun />
          <span>UV-8</span>
        </div>
      </CardFooter>
    </Card>
  );
}
