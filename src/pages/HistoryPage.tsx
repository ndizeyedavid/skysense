import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getHistoricalWeatherData } from "@/services/weather.api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface HistoricalData {
  temperature: [number, number][];
  humidity: [number, number][];
  cloudCover: [number, number][];
  rain: [number, number][];
}

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoricalWeatherData();
        setHistoricalData(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="px-4 sm:px-7 py-4 sm:py-8 space-y-3 sm:space-y-5">
      <Header />

      <Card>
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>Temperature</span>
              <span>Humidity</span>
              <span>Cloud Cover</span>
              <span>Rain</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-[400px] w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ) : historicalData && (
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "line",
                    height: 400,
                    backgroundColor: "transparent",
                  },
                  title: {
                    text: "Historical Weather Data",
                    align: "left",
                    style: {
                      color: "#64748b",
                    },
                  },
                  subtitle: {
                    text: `Current Date: ${new Date().toLocaleDateString()}`,
                    align: "left",
                    style: {
                      color: "#64748b",
                    },
                  },
                  xAxis: {
                    type: "datetime",
                    labels: {
                      style: {
                        color: "#64748b",
                      },
                    },
                    plotLines: [{
                      color: "red",
                      width: 2,
                      value: new Date().getTime(),
                      label: {
                        text: "Current Time",
                        style: {
                          color: "#64748b",
                        },
                        align: "left",
                        x: 10,
                      },
                      zIndex: 5,
                      dashStyle: "Solid",
                    }],
                  },
                  yAxis: [
                    {
                      title: {
                        text: "Temperature (°C)",
                        style: {
                          color: "#ef4444",
                        },
                      },
                      labels: {
                        style: {
                          color: "#64748b",
                        },
                      },
                    },
                    {
                      title: {
                        text: "Humidity (%)",
                        style: {
                          color: "#3b82f6",
                        },
                      },
                      opposite: true,
                      labels: {
                        style: {
                          color: "#64748b",
                        },
                      },
                    },
                    {
                      title: {
                        text: "Cloud Cover (%)",
                        style: {
                          color: "#9ca3af",
                        },
                      },
                      opposite: true,
                      labels: {
                        style: {
                          color: "#64748b",
                        },
                      },
                    },
                    {
                      title: {
                        text: "Rain (mm)",
                        style: {
                          color: "#0ea5e9",
                        },
                      },
                      opposite: true,
                      labels: {
                        style: {
                          color: "#64748b",
                        },
                      },
                    },
                  ],
                  series: [
                    {
                      name: "Temperature",
                      data: historicalData.temperature,
                      color: "#ef4444",
                      tooltip: {
                        valueSuffix: "°C",
                      },
                    },
                    {
                      name: "Humidity",
                      data: historicalData.humidity,
                      yAxis: 1,
                      color: "#3b82f6",
                      tooltip: {
                        valueSuffix: "%",
                      },
                    },
                    {
                      name: "Cloud Cover",
                      data: historicalData.cloudCover,
                      yAxis: 2,
                      color: "#9ca3af",
                      tooltip: {
                        valueSuffix: "%",
                      },
                    },
                    {
                      name: "Rain",
                      data: historicalData.rain,
                      yAxis: 3,
                      color: "#0ea5e9",
                      tooltip: {
                        valueSuffix: "mm",
                      },
                    },
                  ],
                  credits: {
                    enabled: false,
                  },
                  legend: {
                    itemStyle: {
                      color: "#64748b",
                    },
                  },
                  plotOptions: {
                    series: {
                      marker: {
                        enabled: false,
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
