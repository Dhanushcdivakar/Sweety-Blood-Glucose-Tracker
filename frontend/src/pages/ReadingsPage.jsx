import React, { useState, useEffect, useMemo } from "react";
import { Plus, Filter, RotateCcw } from "lucide-react";
import readingApi from "../api/readingApi";
import { READING_SLOTS } from "../utils/constants";
import { toDateInputValue } from "../utils/formatters";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Pagination from "../components/common/Pagination";
import ReadingTable from "../components/readings/ReadingTable";
import ReadingFormModal from "../components/readings/ReadingFormModal";
import DeleteConfirmModal from "../components/readings/DeleteConfirmModal";

export function ReadingsPage() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters & Pagination state
  const [filterDate, setFilterDate] = useState("");
  const [filterSlot, setFilterSlot] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReading, setEditingReading] = useState(null);
  const [deletingReading, setDeletingReading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchReadings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await readingApi.getReadings();
      setReadings(response.readings || []);
    } catch (err) {
      setError(err.message || "Failed to load readings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    if (editingReading) {
      await readingApi.updateReading(editingReading.id, data);
    } else {
      await readingApi.createReading(data);
    }
    await fetchReadings();
  };

  const handleDelete = async () => {
    if (!deletingReading) return;
    setDeleteLoading(true);
    try {
      await readingApi.deleteReading(deletingReading.id);
      setDeletingReading(null);
      await fetchReadings();
    } catch (err) {
      setError(err.message || "Failed to delete reading");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filtered readings
  const filteredReadings = useMemo(() => {
    return readings.filter((r) => {
      if (filterDate && toDateInputValue(r.date) !== filterDate) {
        return false;
      }
      if (filterSlot && r.slot !== filterSlot) {
        return false;
      }
      return true;
    });
  }, [readings, filterDate, filterSlot]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterDate, filterSlot]);

  // Paginated slice
  const totalPages = Math.ceil(filteredReadings.length / pageSize) || 1;
  const paginatedReadings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReadings.slice(start, start + pageSize);
  }, [filteredReadings, currentPage, pageSize]);

  const hasActiveFilters = Boolean(filterDate || filterSlot);

  const handleResetFilters = () => {
    setFilterDate("");
    setFilterSlot("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Blood Glucose Readings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View, add, edit, or remove your daily glucose measurements
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
          Add Reading
        </Button>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onDismiss={() => setError("")}
        />
      )}

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Filter className="w-4 h-4" />
            <span>Filter:</span>
          </div>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
            title="Filter by Date"
          />

          <select
            value={filterSlot}
            onChange={(e) => setFilterSlot(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="">All Slots</option>
            {READING_SLOTS.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total: <span className="font-semibold text-slate-800">{filteredReadings.length}</span>{" "}
          {filteredReadings.length === 1 ? "reading" : "readings"}
        </div>
      </div>

      {/* Readings Table / Cards with Pagination */}
      {loading ? (
        <LoadingSpinner text="Loading readings..." />
      ) : (
        <div className="space-y-4">
          <ReadingTable
            readings={paginatedReadings}
            onEdit={(r) => {
              setEditingReading(r);
              setIsModalOpen(true);
            }}
            onDelete={(r) => setDeletingReading(r)}
            onAddNew={() => {
              setEditingReading(null);
              setIsModalOpen(true);
            }}
            emptyMessage={
              hasActiveFilters
                ? "No readings match the selected filter criteria."
                : "No blood glucose readings recorded yet."
            }
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredReadings.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
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

export default ReadingsPage;

