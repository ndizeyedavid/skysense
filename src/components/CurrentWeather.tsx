import { Cloud, CloudSun } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function CurrentWeather() {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-24">
        <div className="space-y-2">
          <h3 className="text-[50px]">27°C</h3>
          {/* aux text */}
          <div className="space-y-2 text-gray-400 text-sm">
            <p>
              Feels Like: <span className="text-black font-bold">28°</span>
            </p>
            <p>
              Temp. 24h change:{" "}
              <span className="text-black font-bold">-2°</span>
            </p>
            <p>
              Rain Probability <span className="text-black font-bold">0%</span>
            </p>
          </div>
        </div>

        <div className="mt-[50px] space-y-2">
          {/* Day status */}
          <h3 className="text-sm font-medium">Cloudy</h3>
          {/* aux text */}
          <div className="space-y-2 text-gray-400 text-sm">
            <p>
              High: <span className="text-black font-bold">38°</span>, Low:{" "}
              <span className="text-black font-bold">28°</span>
            </p>
            <p>
              QPF: <span className="text-black font-bold">0.4mm</span>
            </p>
            <p>
              None Probability <span className="text-black font-bold">5%</span>
            </p>
          </div>
        </div>

        {/* status icon */}
        <div className="relative">
          <CloudSun className="absolute size-[100px] opacity-40 -right-2 -top-3" />
        </div>
      </CardContent>
    </Card>
  );
}
