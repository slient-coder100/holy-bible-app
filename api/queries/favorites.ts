import { getDb } from "./connection";
import { favoriteVerses } from "@db/schema";
import { eq, and } from "drizzle-orm";

export async function findFavoritesByUser(userId: number) {
  return getDb().query.favoriteVerses.findMany({
    where: eq(favoriteVerses.userId, userId),
    orderBy: (favoriteVerses, { desc }) => [desc(favoriteVerses.createdAt)],
  });
}

export async function createFavoriteVerse(data: {
  userId: number;
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
}) {
  return getDb().insert(favoriteVerses).values(data);
}

export async function deleteFavoriteVerse(id: number) {
  return getDb().delete(favoriteVerses).where(eq(favoriteVerses.id, id));
}

export async function isVerseFavorited(
  userId: number,
  bookId: string,
  chapter: number,
  verse: number
) {
  const result = await getDb()
    .select()
    .from(favoriteVerses)
    .where(
      and(
        eq(favoriteVerses.userId, userId),
        eq(favoriteVerses.bookId, bookId),
        eq(favoriteVerses.chapter, chapter),
        eq(favoriteVerses.verse, verse)
      )
    )
    .limit(1);
  return result.length > 0;
}
