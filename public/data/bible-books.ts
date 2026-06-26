export interface BibleBook {
  id: string;
  name: string;
  testament: "old" | "new";
  genre: string;
  chapters: number;
  abbrev: string;
}

export const bibleBooks: BibleBook[] = [
  { id: "gen", name: "Genesis", testament: "old", genre: "Law", chapters: 50, abbrev: "Gen" },
  { id: "exo", name: "Exodus", testament: "old", genre: "Law", chapters: 40, abbrev: "Exo" },
  { id: "lev", name: "Leviticus", testament: "old", genre: "Law", chapters: 27, abbrev: "Lev" },
  { id: "num", name: "Numbers", testament: "old", genre: "Law", chapters: 36, abbrev: "Num" },
  { id: "deu", name: "Deuteronomy", testament: "old", genre: "Law", chapters: 34, abbrev: "Deu" },
  { id: "jos", name: "Joshua", testament: "old", genre: "History", chapters: 24, abbrev: "Jos" },
  { id: "jdg", name: "Judges", testament: "old", genre: "History", chapters: 21, abbrev: "Jdg" },
  { id: "rut", name: "Ruth", testament: "old", genre: "History", chapters: 4, abbrev: "Rut" },
  { id: "1sa", name: "1 Samuel", testament: "old", genre: "History", chapters: 31, abbrev: "1Sa" },
  { id: "2sa", name: "2 Samuel", testament: "old", genre: "History", chapters: 24, abbrev: "2Sa" },
  { id: "1ki", name: "1 Kings", testament: "old", genre: "History", chapters: 22, abbrev: "1Ki" },
  { id: "2ki", name: "2 Kings", testament: "old", genre: "History", chapters: 25, abbrev: "2Ki" },
  { id: "1ch", name: "1 Chronicles", testament: "old", genre: "History", chapters: 29, abbrev: "1Ch" },
  { id: "2ch", name: "2 Chronicles", testament: "old", genre: "History", chapters: 36, abbrev: "2Ch" },
  { id: "ezr", name: "Ezra", testament: "old", genre: "History", chapters: 10, abbrev: "Ezr" },
  { id: "neh", name: "Nehemiah", testament: "old", genre: "History", chapters: 13, abbrev: "Neh" },
  { id: "est", name: "Esther", testament: "old", genre: "History", chapters: 10, abbrev: "Est" },
  { id: "job", name: "Job", testament: "old", genre: "Poetry", chapters: 42, abbrev: "Job" },
  { id: "psa", name: "Psalms", testament: "old", genre: "Poetry", chapters: 150, abbrev: "Psa" },
  { id: "pro", name: "Proverbs", testament: "old", genre: "Poetry", chapters: 31, abbrev: "Pro" },
  { id: "ecc", name: "Ecclesiastes", testament: "old", genre: "Poetry", chapters: 12, abbrev: "Ecc" },
  { id: "sng", name: "Song of Solomon", testament: "old", genre: "Poetry", chapters: 8, abbrev: "Son" },
  { id: "isa", name: "Isaiah", testament: "old", genre: "Major Prophets", chapters: 66, abbrev: "Isa" },
  { id: "jer", name: "Jeremiah", testament: "old", genre: "Major Prophets", chapters: 52, abbrev: "Jer" },
  { id: "lam", name: "Lamentations", testament: "old", genre: "Major Prophets", chapters: 5, abbrev: "Lam" },
  { id: "ezk", name: "Ezekiel", testament: "old", genre: "Major Prophets", chapters: 48, abbrev: "Eze" },
  { id: "dan", name: "Daniel", testament: "old", genre: "Major Prophets", chapters: 12, abbrev: "Dan" },
  { id: "hos", name: "Hosea", testament: "old", genre: "Minor Prophets", chapters: 14, abbrev: "Hos" },
  { id: "jol", name: "Joel", testament: "old", genre: "Minor Prophets", chapters: 3, abbrev: "Joe" },
  { id: "amo", name: "Amos", testament: "old", genre: "Minor Prophets", chapters: 9, abbrev: "Amo" },
  { id: "oba", name: "Obadiah", testament: "old", genre: "Minor Prophets", chapters: 1, abbrev: "Oba" },
  { id: "jon", name: "Jonah", testament: "old", genre: "Minor Prophets", chapters: 4, abbrev: "Jon" },
  { id: "mic", name: "Micah", testament: "old", genre: "Minor Prophets", chapters: 7, abbrev: "Mic" },
  { id: "nam", name: "Nahum", testament: "old", genre: "Minor Prophets", chapters: 3, abbrev: "Nah" },
  { id: "hab", name: "Habakkuk", testament: "old", genre: "Minor Prophets", chapters: 3, abbrev: "Hab" },
  { id: "zep", name: "Zephaniah", testament: "old", genre: "Minor Prophets", chapters: 3, abbrev: "Zep" },
  { id: "hag", name: "Haggai", testament: "old", genre: "Minor Prophets", chapters: 2, abbrev: "Hag" },
  { id: "zec", name: "Zechariah", testament: "old", genre: "Minor Prophets", chapters: 14, abbrev: "Zec" },
  { id: "mal", name: "Malachi", testament: "old", genre: "Minor Prophets", chapters: 4, abbrev: "Mal" },
  { id: "mat", name: "Matthew", testament: "new", genre: "Gospels", chapters: 28, abbrev: "Mat" },
  { id: "mrk", name: "Mark", testament: "new", genre: "Gospels", chapters: 16, abbrev: "Mar" },
  { id: "luk", name: "Luke", testament: "new", genre: "Gospels", chapters: 24, abbrev: "Luk" },
  { id: "jhn", name: "John", testament: "new", genre: "Gospels", chapters: 21, abbrev: "Joh" },
  { id: "act", name: "Acts", testament: "new", genre: "History", chapters: 28, abbrev: "Act" },
  { id: "rom", name: "Romans", testament: "new", genre: "Paul's Letters", chapters: 16, abbrev: "Rom" },
  { id: "1co", name: "1 Corinthians", testament: "new", genre: "Paul's Letters", chapters: 16, abbrev: "1Co" },
  { id: "2co", name: "2 Corinthians", testament: "new", genre: "Paul's Letters", chapters: 13, abbrev: "2Co" },
  { id: "gal", name: "Galatians", testament: "new", genre: "Paul's Letters", chapters: 6, abbrev: "Gal" },
  { id: "eph", name: "Ephesians", testament: "new", genre: "Paul's Letters", chapters: 6, abbrev: "Eph" },
  { id: "php", name: "Philippians", testament: "new", genre: "Paul's Letters", chapters: 4, abbrev: "Phi" },
  { id: "col", name: "Colossians", testament: "new", genre: "Paul's Letters", chapters: 4, abbrev: "Col" },
  { id: "1th", name: "1 Thessalonians", testament: "new", genre: "Paul's Letters", chapters: 5, abbrev: "1Th" },
  { id: "2th", name: "2 Thessalonians", testament: "new", genre: "Paul's Letters", chapters: 3, abbrev: "2Th" },
  { id: "1ti", name: "1 Timothy", testament: "new", genre: "Paul's Letters", chapters: 6, abbrev: "1Ti" },
  { id: "2ti", name: "2 Timothy", testament: "new", genre: "Paul's Letters", chapters: 4, abbrev: "2Ti" },
  { id: "tit", name: "Titus", testament: "new", genre: "Paul's Letters", chapters: 3, abbrev: "Tit" },
  { id: "phm", name: "Philemon", testament: "new", genre: "Paul's Letters", chapters: 1, abbrev: "Phm" },
  { id: "heb", name: "Hebrews", testament: "new", genre: "General Letters", chapters: 13, abbrev: "Heb" },
  { id: "jas", name: "James", testament: "new", genre: "General Letters", chapters: 5, abbrev: "Jam" },
  { id: "1pe", name: "1 Peter", testament: "new", genre: "General Letters", chapters: 5, abbrev: "1Pe" },
  { id: "2pe", name: "2 Peter", testament: "new", genre: "General Letters", chapters: 3, abbrev: "2Pe" },
  { id: "1jn", name: "1 John", testament: "new", genre: "General Letters", chapters: 5, abbrev: "1Jo" },
  { id: "2jn", name: "2 John", testament: "new", genre: "General Letters", chapters: 1, abbrev: "2Jo" },
  { id: "3jn", name: "3 John", testament: "new", genre: "General Letters", chapters: 1, abbrev: "3Jo" },
  { id: "jud", name: "Jude", testament: "new", genre: "General Letters", chapters: 1, abbrev: "Jud" },
  { id: "rev", name: "Revelation", testament: "new", genre: "Prophecy", chapters: 22, abbrev: "Rev" },
];

export const getBookById = (id: string): BibleBook | undefined =>
  bibleBooks.find((b) => b.id === id);

export const getOldTestamentBooks = (): BibleBook[] =>
  bibleBooks.filter((b) => b.testament === "old");

export const getNewTestamentBooks = (): BibleBook[] =>
  bibleBooks.filter((b) => b.testament === "new");

export const getBooksByGenre = (genre: string): BibleBook[] =>
  bibleBooks.filter((b) => b.genre === genre);
