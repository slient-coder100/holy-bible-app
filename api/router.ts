import { authRouter } from "./auth-router";
import { bibleRouter } from "./bibleRouter";
import { prayerRouter } from "./prayerRouter";
import { chatRouter } from "./chatRouter";
import { favoritesRouter } from "./favoritesRouter";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  bible: bibleRouter,
  prayer: prayerRouter,
  chat: chatRouter,
  favorite: favoritesRouter,
});

export type AppRouter = typeof appRouter;
