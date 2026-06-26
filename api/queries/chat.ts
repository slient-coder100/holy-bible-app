import { getDb } from "./connection";
import { chatMessages } from "@db/schema";

export async function findAllChatMessages(limit = 100) {
  return getDb().query.chatMessages.findMany({
    orderBy: (chatMessages, { asc }) => [asc(chatMessages.createdAt)],
    limit,
  });
}

export async function createChatMessage(data: {
  userId: number;
  userName: string;
  userAvatar?: string;
  message: string;
}) {
  const result = await getDb()
    .insert(chatMessages)
    .values(data)
    .$returningId();
  return result;
}
