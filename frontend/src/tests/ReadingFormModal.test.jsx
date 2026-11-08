import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReadingFormModal from "../components/readings/ReadingFormModal";
import { getTodayDateString } from "../utils/formatters";

describe("ReadingFormModal (React Testing Library)", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();
  const todayStr = getTodayDateString();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when open with default values", () => {
    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    expect(screen.getByText("Record Blood Glucose")).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toHaveValue(todayStr);
    expect(screen.getByLabelText(/Reading Slot/i)).toHaveValue("MORNING_FASTING");
    expect(screen.getByLabelText(/Glucose Value/i)).toHaveValue(null);
  });

  it("shows error when glucose value is empty", async () => {
    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a glucose value.")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error when glucose value is less than 40", async () => {
    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "30" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Value must be between 40 and 600 mg/dl.")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error when glucose value is greater than 600", async () => {
    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "700" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Value must be between 40 and 600 mg/dl.")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error when glucose value is a decimal number", async () => {
    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "120.5" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Value must be a whole number.")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error when a future date is selected", async () => {
    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    // Set a date in the future
    const dateInput = screen.getByLabelText(/Date/i);
    fireEvent.change(dateInput, { target: { name: "date", value: "2099-12-31" } });

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "120" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Date cannot be in the future.")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("rejects duplicate reading for the same slot on the same day", async () => {
    const existingReadings = [
      {
        id: "r1",
        date: todayStr,
        slot: "MORNING_FASTING",
        value: 100,
      },
    ];

    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={existingReadings}
      />
    );

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "115" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(
          /You already have an Morning \(fasting\) reading for this date\./i
        )
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("rejects adding more than 4 readings for the same day", async () => {
    const existingReadings = [
      { id: "r1", date: todayStr, slot: "MORNING_FASTING", value: 100 },
      { id: "r2", date: todayStr, slot: "AFTER_BREAKFAST", value: 140 },
      { id: "r3", date: todayStr, slot: "AFTER_LUNCH", value: 130 },
      { id: "r4", date: todayStr, slot: "AFTER_DINNER", value: 150 },
    ];

    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={existingReadings}
      />
    );

    const slotSelect = screen.getByLabelText(/Reading Slot/i);
    fireEvent.change(slotSelect, { target: { name: "slot", value: "AFTER_LUNCH" } });

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "125" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/You (already have an|can add only 4 readings per day)/i)
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("successfully calls onSubmit when all inputs are valid", async () => {
    mockOnSubmit.mockResolvedValueOnce({ success: true });

    render(
      <ReadingFormModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingReadings={[]}
      />
    );

    const valueInput = screen.getByLabelText(/Glucose Value/i);
    fireEvent.change(valueInput, { target: { name: "value", value: "125" } });

    const submitBtn = screen.getByRole("button", { name: /Add Reading/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        date: todayStr,
        slot: "MORNING_FASTING",
        value: 125,
      });
    });
  });
});
