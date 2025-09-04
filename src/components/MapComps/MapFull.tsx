import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock weather data
const weatherLocations = [
  {
    lng: 29.7464,
    lat: -2.3737,
    temp: 20,
    condition: "sunny",
  },
];

// @ts-ignore
const createWeatherMarkerElement = (temp: number, condition: string) => {
  const el = document.createElement("div");
  el.className = "weather-marker";

  // Create weather icon container
  const iconContainer = document.createElement("div");
  iconContainer.className = "marker-icon";
  iconContainer.style.width = "40px";
  iconContainer.style.height = "40px";
  iconContainer.style.fontSize = "27px";
  iconContainer.style.backgroundColor = "#4299E1";
  iconContainer.style.borderRadius = "50%";
  iconContainer.style.display = "flex";
  iconContainer.style.alignItems = "center";
  iconContainer.style.justifyContent = "center";

  // Add weather icon (you can replace this with actual weather icons)
  const icon = document.createElement("div");
  icon.innerHTML = "☀️"; // Default sunny icon
  if (condition === "cloudy") icon.innerHTML = "☁️";
  if (condition === "partly-cloudy") icon.innerHTML = "⛅";

  iconContainer.appendChild(icon);
  el.appendChild(iconContainer);

  return el;
};

export default function MapFull() {
  const mapContainer: any = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/satellite/style.json?key=" +
        import.meta.env.VITE_SATELLITE_MAP,
      center: [29.7464, -2.3737],
      zoom: 9,
    });

    map.on("load", async () => {
      setLoading(false);
      // Add Rwanda admin boundaries
      map.addSource("rwanda-boundaries", {
        type: "geojson",
        data: "/geojson/RWA_2.json",
      });

      map.addLayer({
        id: "rwanda-boundary-line",
        type: "line",
        source: "rwanda-boundaries",
        paint: {
          "line-color": "#0000",
          "line-width": 0.6,
        },
      });

      map.addLayer({
        id: "rwanda-boundary-fill",
        type: "fill",
        source: "rwanda-boundaries",
        paint: {
          "fill-color": "#e5e5e5",
          "fill-opacity": 0.4,
        },
      });

      //   {Marker}
      //   new maplibregl.Marker({ color: "#1D4ED8" })
      //     .setLngLat([29.991, -2.0903])
      //     .setPopup(
      //       new maplibregl.Popup().setHTML(
      //         `<strong claasName="text-black">Mellow</strong><br>20c`
      //       )
      //     )
      //     .addTo(map);

      // Add weather markers
      weatherLocations.forEach((location) => {
        const markerElement = createWeatherMarkerElement(
          location.temp,
          location.condition
        );

        new maplibregl.Marker({ element: markerElement })
          .setLngLat([location.lng, location.lat])
          .setPopup(
            new maplibregl.Popup({
              offset: 25,
              className: "weather-popup",
            }).setHTML(
              `<div style="text-align: center;">
                <strong style="font-size: 16px;">${location.temp}°C</strong>
                <br/>
                <span style="color: #666;">${location.condition}</span>
              </div>`
            )
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="h-full bg-muted rounded-lg flex items-center justify-center border-2 overflow-hidden border-dashed">
      {loading && <Skeleton className="w-full h-full" />}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
