import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

const seed = async () => {
  try {
    const hashedPassword = await bcrypt.hash("password123", 12);

    const user = await prisma.user.upsert({
      where: {
        email: "demo@sweety.com",
      },
      update: {},
      create: {
        name: "Demo User",
        email: "demo@sweety.com",
        password: hashedPassword,
      },
    });

    const readings = [
      { date: "2026-11-05", slot: "MORNING_FASTING", value: 105 },
      { date: "2026-11-05", slot: "AFTER_BREAKFAST", value: 140 },
      { date: "2026-11-06", slot: "MORNING_FASTING", value: 110 },
      { date: "2026-11-06", slot: "AFTER_LUNCH", value: 135 },
      { date: "2026-11-07", slot: "MORNING_FASTING", value: 115 },
      { date: "2026-11-07", slot: "AFTER_DINNER", value: 145 },
    ];

    for (const reading of readings) {
      await prisma.reading.upsert({
        where: {
          userId_date_slot: {
            userId: user.id,
            date: new Date(`${reading.date}T00:00:00.000Z`),
            slot: reading.slot,
          },
        },
        update: {
          value: reading.value,
        },
        create: {
          ...reading,
          date: new Date(`${reading.date}T00:00:00.000Z`),
          userId: user.id,
        },
      });
    }

    console.log("Demo user and readings created successfully.");
    console.log("Email: demo@sweety.com");
    console.log("Password: password123");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

seed();
