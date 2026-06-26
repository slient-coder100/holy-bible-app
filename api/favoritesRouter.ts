import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import {
  findFavoritesByUser,
  createFavoriteVerse,
  deleteFavoriteVerse,
} from "./queries/favorites";

export const favoritesRouter = createRouter({
  list: authedQuery.query(({ ctx }) => findFavoritesByUser(ctx.user.id)),

  add: authedQuery
    .input(
      z.object({
        bookId: z.string(),
        chapter: z.number().min(1),
        verse: z.number().min(1),
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) =>
      createFavoriteVerse({
        userId: ctx.user.id,
        bookId: input.bookId,
        chapter: input.chapter,
        verse: input.verse,
        text: input.text,
      })
    ),

  remove: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteFavoriteVerse(input.id)),
});
