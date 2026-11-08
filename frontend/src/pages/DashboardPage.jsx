import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Activity, Calendar, ArrowRight, HeartPulse } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import readingApi from "../api/readingApi";
import reportApi from "../api/reportApi";
import { READING_SLOTS } from "../utils/constants";
import { getTodayDateString, toDateInputValue } from "../utils/formatters";
import Button from "../components/common/Button";
import StatCard from "../components/common/StatCard";
import Alert from "../components/common/Alert";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ReadingTable from "../components/readings/ReadingTable";
import ReadingFormModal from "../components/readings/ReadingFormModal";
import DeleteConfirmModal from "../components/readings/DeleteConfirmModal";
import TrendChart from "../components/reports/TrendChart";

export function DashboardPage() {
  const { user } = useAuth();
  const todayStr = getTodayDateString();

  const [readings, setReadings] = useState([]);
  const [dailyReport, setDailyReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReading, setEditingReading] = useState(null);
  const [deletingReading, setDeletingReading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [readingsRes, reportRes] = await Promise.all([
        readingApi.getReadings(),
        reportApi.getReports(todayStr),
      ]);

      setReadings(readingsRes.readings || []);
      setDailyReport(reportRes.reports?.daily || null);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    if (editingReading) {
      await readingApi.updateReading(editingReading.id, data);
    } else {
      await readingApi.createReading(data);
    }
    await fetchData();
  };

  const handleDelete = async () => {
    if (!deletingReading) return;
    setDeleteLoading(true);
    try {
      await readingApi.deleteReading(deletingReading.id);
      setDeletingReading(null);
      await fetchData();
    } catch (err) {
      setError(err.message || "Failed to delete reading");
    } finally {
      setDeleteLoading(false);
    }
  };

  const todayReadings = readings.filter(
    (r) => toDateInputValue(r.date) === todayStr
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-1">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <span>Daily Overview</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.name || "Patient"}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {todayReadings.length === 0
              ? "You haven't logged any readings yet today. Keep track of your blood glucose!"
              : `You have recorded ${todayReadings.length} of 4 readings today.`}
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingReading(null);
            setIsModalOpen(true);
          }}
          variant="primary"
          icon={Plus}
        >
          Log Reading
        </Button>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onDismiss={() => setError("")}
        />
      )}

      {loading ? (
        <LoadingSpinner text="Loading your dashboard..." />
      ) : (
        <>
          {/* Today's 4 Slots Status Tracker */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                Today's Schedule ({todayReadings.length}/4 logged)
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Max 4 readings per day
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {READING_SLOTS.map((slot) => {
                const reading = todayReadings.find((r) => r.slot === slot.id);
                return (
                  <div
                    key={slot.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      reading
                        ? "bg-slate-50/70 border-slate-200"
                        : "bg-white border-dashed border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">
                        {slot.label}
                      </span>
                      {reading ? (
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Logged
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400">
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-baseline justify-between">
                      {reading ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-slate-900">
                            {reading.value}
                          </span>
                          <span className="text-xs text-slate-500">mg/dl</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingReading({
                              date: todayStr,
                              slot: slot.id,
                              value: "",
                            });
                            setIsModalOpen(true);
                          }}
                          className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Record now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Average"
              value={
                dailyReport?.average !== null && dailyReport?.average !== undefined
                  ? Number(dailyReport.average).toFixed(1)
                  : "—"
              }
              unit="mg/dl"
              subtitle="Mean level for today"
              icon={Activity}
              colorScheme="primary"
            />
            <StatCard
              title="Today's Peak"
              value={dailyReport?.highest}
              unit="mg/dl"
              subtitle="Highest value today"
              colorScheme="rose"
            />
            <StatCard
              title="Today's Lowest"
              value={dailyReport?.lowest}
              unit="mg/dl"
              subtitle="Lowest value today"
              colorScheme="emerald"
            />
            <StatCard
              title="Total Today"
              value={todayReadings.length}
              unit="of 4 slots"
              subtitle="Readings recorded today"
              icon={Calendar}
              colorScheme="slate"
            />
          </div>

          {/* Glucose Trend Preview */}
          {readings.length > 0 && <TrendChart readings={readings} />}

          {/* Recent Readings List */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Recent Readings
                </h3>
                <p className="text-xs text-slate-500">
                  Showing your most recently recorded glucose measurements
                </p>
              </div>
              <Link
                to="/readings"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
              >
                View all ({readings.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <ReadingTable
              readings={readings.slice(0, 5)}
              onEdit={(r) => {
                setEditingReading(r);
                setIsModalOpen(true);
              }}
              onDelete={(r) => setDeletingReading(r)}
              onAddNew={() => {
                setEditingReading(null);
                setIsModalOpen(true);
              }}
            />
          </div>
        </>
      )}

      {/* Add / Edit Reading Modal */}
      <ReadingFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingReading(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingReading}
        existingReadings={readings}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingReading)}
        onClose={() => setDeletingReading(null)}
        onConfirm={handleDelete}
        reading={deletingReading}
        loading={deleteLoading}
      />
    </div>
  );
}

export default DashboardPage;

