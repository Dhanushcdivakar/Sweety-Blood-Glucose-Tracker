import React, { useState, useEffect } from "react";
import { Calendar, BarChart3 } from "lucide-react";
import reportApi from "../api/reportApi";
import readingApi from "../api/readingApi";
import { getTodayDateString, formatDate } from "../utils/formatters";
import DateSelector from "../components/reports/DateSelector";
import ReportSummaryCard from "../components/reports/ReportSummaryCard";
import DailyReadingsList from "../components/reports/DailyReadingsList";
import TrendChart from "../components/reports/TrendChart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Alert from "../components/common/Alert";

export function ReportsPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [reports, setReports] = useState(null);
  const [allReadings, setAllReadings] = useState([]);
  const [activeTab, setActiveTab] = useState("daily"); // "daily" | "mtd" | "previous"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async (date) => {
    setLoading(true);
    setError("");
    try {
      const [reportRes, readingsRes] = await Promise.all([
        reportApi.getReports(date),
        readingApi.getReadings(),
      ]);

      setReports(reportRes.reports || null);
      setAllReadings(readingsRes.readings || []);
    } catch (err) {
      setError(err.message || "Unable to generate reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(selectedDate);
  }, [selectedDate]);

  const { daily, monthToDate, previousMonth } = reports || {};

  // Compute date range labels for display
  const getPeriodLabels = () => {
    const d = new Date(`${selectedDate}T00:00:00.000Z`);
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth(); // 0-indexed

    // Month-to-date: 1st of month to selected date
    const startMtd = new Date(Date.UTC(year, month, 1));
    const mtdLabel = `${formatDate(startMtd)} – ${formatDate(selectedDate)}`;

    // Previous month: 1st to last day of previous month
    const prevMonthDate = new Date(Date.UTC(year, month - 1, 1));
    const lastDayPrevMonth = new Date(Date.UTC(year, month, 0));
    const prevMonthLabel = `${formatDate(prevMonthDate)} – ${formatDate(lastDayPrevMonth)}`;

    return {
      dailyLabel: formatDate(selectedDate),
      mtdLabel,
      prevMonthLabel,
    };
  };

  const periodLabels = getPeriodLabels();

  return (
    <div className="space-y-6">
      {/* Header and Date Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Glucose Reports
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Statistical summaries for Daily, Month-to-date, and Previous Month
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={(newDate) => setSelectedDate(newDate)}
          />
        </div>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onDismiss={() => setError("")}
        />
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab("daily")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "daily"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            Daily Report ({periodLabels.dailyLabel})
          </button>

          <button
            onClick={() => setActiveTab("mtd")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "mtd"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            Month-to-Date ({periodLabels.mtdLabel})
          </button>

          <button
            onClick={() => setActiveTab("previous")}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "previous"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            Previous Month ({periodLabels.prevMonthLabel})
          </button>
        </nav>
      </div>

      {loading ? (
        <LoadingSpinner text="Generating reports..." />
      ) : (
        <div className="space-y-6">
          {/* Active Tab View */}
          {activeTab === "daily" && (
            <div>
              <ReportSummaryCard
                title={`Daily Report — ${periodLabels.dailyLabel}`}
                subtitle="Glucose summary for the selected date"
                reportData={daily}
                periodName="day"
              />
              {daily && daily.count > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mt-6">
                  <DailyReadingsList readings={daily.readings || []} />
                </div>
              )}
            </div>
          )}

          {activeTab === "mtd" && (
            <div>
              <ReportSummaryCard
                title={`Month-to-Date Report — ${periodLabels.mtdLabel}`}
                subtitle="Cumulative statistics from the 1st of the month to the selected date"
                reportData={monthToDate}
                periodName="month-to-date period"
              />
            </div>
          )}

          {activeTab === "previous" && (
            <div>
              <ReportSummaryCard
                title={`Previous Month Report — ${periodLabels.prevMonthLabel}`}
                subtitle="Complete monthly summary for the preceding calendar month"
                reportData={previousMonth}
                periodName="previous month"
              />
            </div>
          )}

          {/* Trend Chart across all user readings */}
          {allReadings.length > 0 && (
            <div className="mt-8">
              <TrendChart readings={allReadings} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;

