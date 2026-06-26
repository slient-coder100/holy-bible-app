import { getDb } from "./connection";
import { prayers } from "@db/schema";
import { eq } from "drizzle-orm";

export async function findAllPrayers() {
  return getDb().query.prayers.findMany({
    orderBy: (prayers, { asc }) => [asc(prayers.dayOfWeek), asc(prayers.id)],
  });
}

export async function findPrayersByDay(dayOfWeek: number) {
  return getDb().query.prayers.findMany({
    where: eq(prayers.dayOfWeek, dayOfWeek),
  });
}

export async function findPrayersByCategory(category: string) {
  return getDb().query.prayers.findMany({
    where: eq(prayers.category, category),
  });
}
