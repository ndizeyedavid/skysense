import { Sun } from "lucide-react";

export default function ForecastDay() {
  return (
    <div className="bg-blue-500 opacity-70 hover:opacity-100 transition-all cursor-pointer rounded-sm text-xs text-center text-white py-4 gap-4 flex items-center flex-col justify-between">
      <div className="text-center space-y-1">
        <h5>Today</h5>
        <h6>08-26</h6>
      </div>

      <div className="p-1 bg-blue-800/20 rounded-full">
        <Sun className="size-[23px] text-yellow-300" />
      </div>

      <h3 className="text-[16px] font-medium text-centerw-full flex items-center justify-center">
        33°
      </h3>
    </div>
  );
}
