import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { formatDate, getSlotLabel } from "../../utils/formatters";

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  reading,
  loading = false,
}) {
  if (!reading) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Reading?"
      maxWidth="max-w-sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete the{" "}
          <strong className="text-slate-900 font-semibold">
            {getSlotLabel(reading.slot)}
          </strong>{" "}
          reading ({reading.value} mg/dl) on{" "}
          <strong className="text-slate-900 font-semibold">
            {formatDate(reading.date)}
          </strong>
          ? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            Delete Reading
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;

