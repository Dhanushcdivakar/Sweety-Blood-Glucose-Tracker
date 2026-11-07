import prisma from "../config/prisma.js";

export const createReading = async (req, res) => {
  try {
    const { date, slot, value } = req.body;

    // Reject future dates
    const readingDate = new Date(`${date}T00:00:00.000Z`);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (readingDate > today) {
      return res.status(400).json({
        success: false,
        message: "Date cannot be in the future.",
      });
    }

    // Check whether this slot already has a reading
    const existingReading = await prisma.reading.findUnique({
      where: {
        userId_date_slot: {
          userId: req.userId,
          date: readingDate,
          slot,
        },
      },
    });

    if (existingReading) {
      return res.status(409).json({
        success: false,
        message: `You already have an ${slot.replaceAll("_", " ").toLowerCase()} reading for this date.`,
      });
    }

    // Check maximum 4 readings per day
    const dailyCount = await prisma.reading.count({
      where: {
        userId: req.userId,
        date: readingDate,
      },
    });

    if (dailyCount >= 4) {
      return res.status(400).json({
        success: false,
        message: "You can add only 4 readings per day.",
      });
    }

    // Create reading
    const reading = await prisma.reading.create({
      data: {
        date: readingDate,
        slot,
        value,
        userId: req.userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Glucose reading added successfully.",
      reading,
    });
  } catch (error) {
    console.error("Create reading error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "You already have a reading for this date and slot.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getReadings = async (req, res) => {
  try {
    const readings = await prisma.reading.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: readings.length,
      readings,
    });
  } catch (error) {
    console.error("Get readings error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateReading = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, slot, value } = req.body;

    const existingReading = await prisma.reading.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingReading) {
      return res.status(404).json({
        success: false,
        message: "Reading not found.",
      });
    }

    const updatedDate = date
      ? new Date(`${date}T00:00:00.000Z`)
      : existingReading.date;

    const updatedSlot = slot ?? existingReading.slot;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (updatedDate > today) {
      return res.status(400).json({
        success: false,
        message: "Date cannot be in the future.",
      });
    }

    // Check for duplicate slot
    const duplicate = await prisma.reading.findFirst({
      where: {
        userId: req.userId,
        date: updatedDate,
        slot: updatedSlot,
        NOT: { id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "A reading already exists for this date and slot.",
      });
    }

    // Check daily reading limit if the date changes
    if (updatedDate.getTime() !== existingReading.date.getTime()) {
      const dailyCount = await prisma.reading.count({
        where: {
          userId: req.userId,
          date: updatedDate,
        },
      });

      if (dailyCount >= 4) {
        return res.status(400).json({
          success: false,
          message: "You can add only 4 readings per day.",
        });
      }
    }

    const reading = await prisma.reading.update({
      where: { id },
      data: {
        date: updatedDate,
        slot: updatedSlot,
        ...(value !== undefined && { value }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Reading updated successfully.",
      reading,
    });
  } catch (error) {
    console.error("Update reading error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A reading already exists for this date and slot.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const deleteReading = async (req, res) => {
  try {
    const { id } = req.params;

    const reading = await prisma.reading.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!reading) {
      return res.status(404).json({
        success: false,
        message: "Reading not found.",
      });
    }

    await prisma.reading.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Reading deleted successfully.",
    });
  } catch (error) {
    console.error("Delete reading error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
