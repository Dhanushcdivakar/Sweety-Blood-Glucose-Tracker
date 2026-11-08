import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import Alert from "../common/Alert";
import { readingSchema } from "../../schemas/readingSchema";
import { READING_SLOTS } from "../../utils/constants";
import {
  getTodayDateString,
  toDateInputValue,
  getSlotLabel,
} from "../../utils/formatters";

export function ReadingFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  existingReadings = [],
}) {
  const isEditing = Boolean(initialData?.id);
  const todayStr = getTodayDateString();

  const [formData, setFormData] = useState({
    date: todayStr,
    slot: "MORNING_FASTING",
    value: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: toDateInputValue(initialData.date),
        slot: initialData.slot || "MORNING_FASTING",
        value: initialData.value !== undefined ? String(initialData.value) : "",
      });
    } else {
      setFormData({
        date: todayStr,
        slot: "MORNING_FASTING",
        value: "",
      });
    }
    setErrors({});
    setServerError("");
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // 1. Zod schema validation
    const result = readingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0];
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const { date, slot, value } = result.data;

    // 2. Client-side duplicate slot check against existingReadings
    const duplicateSlot = existingReadings.find((r) => {
      const rDate = toDateInputValue(r.date);
      const isSameDate = rDate === date;
      const isSameSlot = r.slot === slot;
      const isDifferentId = !isEditing || r.id !== initialData?.id;
      return isSameDate && isSameSlot && isDifferentId;
    });

    if (duplicateSlot) {
      const slotName = getSlotLabel(slot);
      setServerError(`You already have an ${slotName} reading for this date.`);
      return;
    }

    // 3. Client-side max 4 readings per day check
    if (!isEditing || toDateInputValue(initialData?.date) !== date) {
      const dailyCount = existingReadings.filter(
        (r) => toDateInputValue(r.date) === date && r.id !== initialData?.id
      ).length;

      if (dailyCount >= 4) {
        setServerError("You can add only 4 readings per day.");
        return;
      }
    }

    // 4. Submit to parent
    setSubmitting(true);
    try {
      await onSubmit({
        date,
        slot,
        value,
      });
      onClose();
    } catch (err) {
      setServerError(err.message || "Failed to save reading. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Glucose Reading" : "Record Blood Glucose"}
      subtitle={
        isEditing
          ? "Update this reading's date, slot, or glucose value"
          : "Add your blood glucose measurement in mg/dl"
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && (
          <Alert
            type="error"
            message={serverError}
            onDismiss={() => setServerError("")}
          />
        )}

        <Input
          label="Date"
          name="date"
          type="date"
          required
          max={todayStr}
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          helperText="Date cannot be in the future"
        />

        <Select
          label="Reading Slot"
          name="slot"
          required
          value={formData.slot}
          onChange={handleChange}
          error={errors.slot}
          placeholder=""
          options={READING_SLOTS.map((s) => ({
            id: s.id,
            label: `${s.label} (${s.timeHint || s.shortLabel})`,
          }))}
        />

        <Input
          label="Glucose Value (mg/dl)"
          name="value"
          type="number"
          required
          placeholder="e.g. 110"
          min={40}
          max={600}
          step={1}
          value={formData.value}
          onChange={handleChange}
          error={errors.value}
          helperText="Normal fasting range is usually 70–99 mg/dl"
        />

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={submitting}>
            {isEditing ? "Save Changes" : "Add Reading"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ReadingFormModal;

