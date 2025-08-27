import MapCurrent from "./MapComps/MapCurrent";
import { Card } from "./ui/card";

export default function CurrentMapView() {
  return (
    <Card
      style={{
        backgroundImage: "url('/assets/sample.png')",
        backgroundSize: "cover",
      }}
      className="h-[230px] p-0"
    >
      <MapCurrent />
    </Card>
  );
}
