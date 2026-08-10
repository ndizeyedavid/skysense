import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllMeasurements } from "@/services/weather.api";
import { Download, Search } from "lucide-react";

interface MeasurementItem {
  id: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  rainfall: number;
  label: string;
  source: string;
}

let cachedData: MeasurementItem[] | null = null;

export default function MeasurementsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MeasurementItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] =
    useState<keyof MeasurementItem>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterLabel, setFilterLabel] = useState<string>("all");
  const [fetchLimit, setFetchLimit] = useState<string>("100");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        const response = await getAllMeasurements();
        const items = response.items || [];
        setData(items);
        cachedData = items;
        setError(null);
      } catch (err) {
        setError("Failed to fetch measurements. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(query),
        ),
      );
    }

    if (filterLabel !== "all") {
      result = result.filter((item) => item.label === filterLabel);
    }

    if (fetchLimit !== "all") {
      const limit = parseInt(fetchLimit, 10);
      result = result.slice(0, limit);
    }

    result.sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, searchQuery, sortColumn, sortDirection, filterLabel, fetchLimit]);

  const exportToCSV = () => {
    const headers = [
      "Timestamp",
      "Temperature (°C)",
      "Humidity (%)",
      "Pressure (hPa)",
      "Rainfall (mm)",
      "Label",
      "Source",
    ];
    const rows = filteredAndSortedData.map((item) => [
      item.timestamp,
      item.temperature,
      item.humidity,
      item.pressure,
      item.rainfall,
      item.label,
      item.source,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `measurements_${new Date().toISOString()}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Measurements Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Measurements Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Pressure (hPa)</th>
              <th>Rainfall (mm)</th>
              <th>Label</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            ${filteredAndSortedData
              .map(
                (item) => `
              <tr>
                <td>${new Date(item.timestamp).toLocaleDateString()}</td>
                <td>${item.temperature}</td>
                <td>${item.humidity}</td>
                <td>${item.pressure}</td>
                <td>${item.rainfall}</td>
                <td>${item.label}</td>
                <td>${item.source}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (loading) {
    return (
      <section className="px-4 sm:px-7 py-4 sm:py-8 space-y-3 sm:space-y-5">
        <Header />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 sm:px-7 py-4 sm:py-8 space-y-3 sm:space-y-5">
        <Header />
        <Card>
          <CardContent className="text-red-500 py-8 text-center">
            {error}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-7 py-4 sm:py-8 space-y-3 sm:space-y-5">
      <Header />
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl">All Measurements</CardTitle>
            <div className="flex gap-2">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={exportToPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search all fields..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Sort By
              </label>
              <select
                value={sortColumn}
                onChange={(e) =>
                  setSortColumn(e.target.value as keyof MeasurementItem)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="timestamp">Timestamp</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="pressure">Pressure</option>
                <option value="rainfall">Rainfall</option>
                <option value="label">Label</option>
                <option value="source">Source</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Direction
              </label>
              <select
                value={sortDirection}
                onChange={(e) =>
                  setSortDirection(e.target.value as "asc" | "desc")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Filter Type
              </label>
              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All</option>
                <option value="real">Real</option>
                <option value="predicted">Predicted</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Show
              </label>
              <select
                value={fetchLimit}
                onChange={(e) => setFetchLimit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="100">Last 100</option>
                <option value="500">Last 500</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {[
                    { key: "timestamp", label: "Timestamp" },
                    { key: "temperature", label: "Temp (°C)" },
                    { key: "humidity", label: "Humidity (%)" },
                    { key: "pressure", label: "Pressure (hPa)" },
                    { key: "rainfall", label: "Rainfall (mm)" },
                    { key: "label", label: "Label" },
                    { key: "source", label: "Source" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="text-left py-3 px-2 font-medium"
                    >
                      <div className="flex items-center gap-1">{col.label}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No measurements found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-2">{item.timestamp}</td>
                      <td className="py-3 px-2">
                        {item.temperature.toFixed(1)}
                      </td>
                      <td className="py-3 px-2">{item.humidity.toFixed(1)}</td>
                      <td className="py-3 px-2">{item.pressure.toFixed(1)}</td>
                      <td className="py-3 px-2">{item.rainfall.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.label === "real"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {item.label}
                        </span>
                      </td>
                      <td className="py-3 px-2">{item.source}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredAndSortedData.length} of {data.length} measurements
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
