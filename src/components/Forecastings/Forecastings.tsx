import { Card, CardContent, CardTitle } from "../ui/card";
import WeatherForecast from "./WeatherForecast";

export default function Forecastings() {
  return (
    <Card>
      <CardTitle>
        <h5 className="px-6 text-xs text-gray-500 font-medium">
          Future Forecast
        </h5>
      </CardTitle>
      <CardContent className="space-y-5">
        <WeatherForecast title="Forecasted Temperature" />
        <WeatherForecast title="Forecasted Precipitation" />
        <WeatherForecast title="Forecasted UV Index" />
      </CardContent>
    </Card>
  );
}
