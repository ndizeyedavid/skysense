import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodayPage from "./pages/TodayPage";
import ForecastPage from "./pages/ForecastPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
