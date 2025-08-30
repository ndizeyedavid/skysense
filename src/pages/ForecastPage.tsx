import CurrentMapView from "@/components/CurrentMapView";
import ForeCastingMetrics from "@/components/Forecastings/ForeCastingMetrics";
import Forecastings from "@/components/Forecastings/Forecastings";
import Header from "@/components/Header";

export default function ForecastPage() {
  return (
    <section className="px-4 sm:px-7 py-4 sm:py-8 space-y-3 sm:space-y-5">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <Forecastings />

        <div className="space-y-3 sm:space-y-4">
          <CurrentMapView />

          <ForeCastingMetrics />
        </div>
      </div>
    </section>
  );
}
