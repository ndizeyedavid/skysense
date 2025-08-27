import Header from "@/components/Header";
import MapFull from "@/components/MapComps/MapFull";

export default function MapPage() {
  return (
    <>
      <section className="px-7 pt-8 space-y-5">
        <Header />
      </section>

      <div className="h-screen">
        <MapFull />
      </div>
    </>
  );
}
