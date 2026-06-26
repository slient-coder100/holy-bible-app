import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { findAllChatMessages, createChatMessage } from "./queries/chat";

export const chatRouter = createRouter({
  list: publicQuery.query(() => findAllChatMessages(100)),

  send: authedQuery
    .input(
      z.object({
        message: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await createChatMessage({
        userId: ctx.user.id,
        userName: ctx.user.name || "Anonymous",
        userAvatar: ctx.user.avatar || undefined,
        message: input.message,
      });
      return { success: true };
    }),
});
