import { Cloud, CloudRain, Sun, Waves } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import type { IDayForecast } from "@/types/dayforecast";

export default function DayForecast({
  title,
  status,
  rainPercent,
  raintMM,
  visibility,
  cloudCoverage,
  UV,
}: IDayForecast) {
  return (
    <Card className="bg-[#669df6] text-white">
      <CardTitle>
        <h5 className="px-4 text-xs text-white/80 font-medium">{title}:</h5>
      </CardTitle>

      <CardContent className="space-y-5">
        <div className=" flex items-center gap-3 text-sm">
          <Sun className="size-[35px] p-2 text-yellow-300 bg-blue-800/20 rounded-full" />
          {status}
        </div>
        {/* rain */}

        <div className="text-sm flex items-center gap-2">
          <CloudRain />
          <span>{rainPercent}%</span>
          <span>{raintMM} mm</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-xs flex items-center gap-3">
          <Waves />
          <span>{visibility}%</span>
        </div>

        <div className="text-xs flex items-center gap-3">
          <Cloud />
          <span>{cloudCoverage}%</span>
        </div>

        <div className="text-xs flex items-center gap-3">
          <Sun />
          <span>{UV}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
