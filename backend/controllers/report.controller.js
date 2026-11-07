import prisma from "../config/prisma.js";

export const getReports = async (req, res) => {
  try {
    // Validate date format
    const dateString = req.query.date;

    if (dateString && !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    // Parse selected date
    const selectedDate = dateString
      ? new Date(`${dateString}T00:00:00.000Z`)
      : new Date();

    // Validate actual calendar date
    if (
      Number.isNaN(selectedDate.getTime()) ||
      (dateString && selectedDate.toISOString().slice(0, 10) !== dateString)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date.",
      });
    }

    selectedDate.setUTCHours(0, 0, 0, 0);

    // Reject future dates
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return res.status(400).json({
        success: false,
        message: "Date cannot be in the future.",
      });
    }

    // Daily report date range
    const startOfDay = selectedDate;
    const endOfDay = new Date(selectedDate);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

    // Month-to-date date range
    const startOfMonth = new Date(
      Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), 1),
    );

    // Previous month date range
    const startOfPreviousMonth = new Date(
      Date.UTC(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth() - 1,
        1,
      ),
    );

    const [dailyReadings, monthToDate, previousMonth] = await Promise.all([
      // Daily readings
      prisma.reading.findMany({
        where: {
          userId: req.userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        orderBy: {
          slot: "asc",
        },
      }),

      // Month-to-date statistics
      prisma.reading.aggregate({
        where: {
          userId: req.userId,
          date: {
            gte: startOfMonth,
            lt: endOfDay,
          },
        },
        _max: { value: true },
        _min: { value: true },
        _avg: { value: true },
        _count: { value: true },
      }),

      // Previous month statistics
      prisma.reading.aggregate({
        where: {
          userId: req.userId,
          date: {
            gte: startOfPreviousMonth,
            lt: startOfMonth,
          },
        },
        _max: { value: true },
        _min: { value: true },
        _avg: { value: true },
        _count: { value: true },
      }),
    ]);

    // Calculate daily statistics
    const calculateStats = (readings) => {
      if (readings.length === 0) {
        return {
          highest: null,
          lowest: null,
          average: null,
          count: 0,
        };
      }

      const values = readings.map((reading) => reading.value);

      const total = values.reduce((sum, value) => sum + value, 0);

      return {
        highest: Math.max(...values),
        lowest: Math.min(...values),
        average: Number((total / values.length).toFixed(1)),
        count: values.length,
      };
    };

    // Format Prisma aggregate results
    const formatAggregate = (result) => ({
      highest: result._max.value,
      lowest: result._min.value,
      average:
        result._avg.value === null
          ? null
          : Number(result._avg.value.toFixed(1)),
      count: result._count.value,
    });

    return res.status(200).json({
      success: true,
      reports: {
        daily: {
          date: selectedDate.toISOString().split("T")[0],
          ...calculateStats(dailyReadings),
          readings: dailyReadings,
        },

        monthToDate: {
          ...formatAggregate(monthToDate),
        },

        previousMonth: {
          ...formatAggregate(previousMonth),
        },
      },
    });
  } catch (error) {
    console.error("Reports error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate reports.",
    });
  }
};
