import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { bibleBooks } from "../public/data/bible-books";
import * as fs from "fs";
import * as path from "path";

const kjvVersesPath = path.join(
  process.cwd(),
  "public/data/kjv-verses.json"
);
const kjvVerses = JSON.parse(fs.readFileSync(kjvVersesPath, "utf-8"));

export const bibleRouter = createRouter({
  getBooks: publicQuery.query(() => {
    return bibleBooks.map((book) => ({
      id: book.id,
      name: book.name,
      testament: book.testament,
      genre: book.genre,
      chapters: book.chapters,
      abbrev: book.abbrev,
    }));
  }),

  getBook: publicQuery
    .input(z.object({ bookId: z.string() }))
    .query(({ input }) => {
      const book = bibleBooks.find((b) => b.id === input.bookId);
      if (!book) return null;
      return book;
    }),

  getChapter: publicQuery
    .input(z.object({ bookId: z.string(), chapter: z.number().min(1) }))
    .query(({ input }) => {
      const book = bibleBooks.find((b) => b.id === input.bookId);
      if (!book) return { book: null, verses: [] };

      const chapterKey = String(input.chapter);
      const bookVerses = kjvVerses[input.bookId] || {};
      const chapterVerses = bookVerses[chapterKey] || {};

      const verses = Object.entries(chapterVerses).map(([verseNum, text]) => ({
        verse: parseInt(verseNum),
        text: text as string,
      }));

      if (verses.length === 0) {
        return {
          book,
          chapter: input.chapter,
          verses: [
            {
              verse: 1,
              text: `This chapter (${book.name} ${input.chapter}) contains scripture. Read the full Bible for complete text.`,
            },
          ],
          isPartial: true,
        };
      }

      return {
        book,
        chapter: input.chapter,
        verses,
        isPartial: false,
      };
    }),

  searchVerses: publicQuery
    .input(z.object({ query: z.string().min(1) }))
    .query(({ input }) => {
      const results: Array<{
        bookId: string;
        bookName: string;
        chapter: number;
        verse: number;
        text: string;
      }> = [];

      const searchLower = input.query.toLowerCase();

      for (const [bookId, chapters] of Object.entries(kjvVerses)) {
        const book = bibleBooks.find((b) => b.id === bookId);
        if (!book) continue;

        for (const [chapterNum, verses] of Object.entries(
          chapters as Record<string, Record<string, string>>
        )) {
          for (const [verseNum, text] of Object.entries(verses)) {
            if (text.toLowerCase().includes(searchLower)) {
              results.push({
                bookId,
                bookName: book.name,
                chapter: parseInt(chapterNum),
                verse: parseInt(verseNum),
                text,
              });
            }
          }
        }
      }

      return results.slice(0, 50);
    }),

  getDailyVerse: publicQuery.query(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Array of meaningful verses for daily rotation
    const dailyVerses = [
      { ref: "Jeremiah 29:11", bookId: "jer", chapter: 29, verse: 11, text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
      { ref: "Philippians 4:13", bookId: "php", chapter: 4, verse: 13, text: "I can do all things through Christ which strengtheneth me." },
      { ref: "Psalm 23:1", bookId: "psa", chapter: 23, verse: 1, text: "The LORD is my shepherd; I shall not want." },
      { ref: "John 3:16", bookId: "jhn", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { ref: "Romans 8:28", bookId: "rom", chapter: 8, verse: 28, text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
      { ref: "Proverbs 3:5-6", bookId: "pro", chapter: 3, verse: 5, text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
      { ref: "Isaiah 40:31", bookId: "isa", chapter: 40, verse: 31, text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
    ];

    const idx = dayOfYear % dailyVerses.length;
    return dailyVerses[idx];
  }),
});
