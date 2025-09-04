import { makePredictions } from "@/services/weather.api";
import { useEffect } from "react";

export function Sampling() {
  useEffect(() => {
    (async () => {
      const res = await makePredictions();

      console.log(res);
    })();
  }, []);
  return <></>;
}
