import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  findAllPrayers,
  findPrayersByDay,
  findPrayersByCategory,
} from "./queries/prayers";

export const prayerRouter = createRouter({
  list: publicQuery.query(() => findAllPrayers()),

  byDay: publicQuery
    .input(z.object({ dayOfWeek: z.number().min(0).max(6) }))
    .query(({ input }) => findPrayersByDay(input.dayOfWeek)),

  byCategory: publicQuery
    .input(z.object({ category: z.string() }))
    .query(({ input }) => findPrayersByCategory(input.category)),

  today: publicQuery.query(() => {
    const dayOfWeek = new Date().getDay();
    return findPrayersByDay(dayOfWeek);
  }),
});
