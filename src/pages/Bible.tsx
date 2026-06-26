import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Search,
  ChevronRight,
  X,
} from "lucide-react";

export default function Bible() {
  const { data: books } = trpc.bible.getBooks.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { data: searchResults } = trpc.bible.searchVerses.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  const oldTestament = books?.filter((b) => b.testament === "old") || [];
  const newTestament = books?.filter((b) => b.testament === "new") || [];

  const genreColors: Record<string, string> = {
    Law: "bg-red-100 text-red-800 border-red-200",
    History: "bg-blue-100 text-blue-800 border-blue-200",
    Poetry: "bg-purple-100 text-purple-800 border-purple-200",
    "Major Prophets": "bg-green-100 text-green-800 border-green-200",
    "Minor Prophets": "bg-emerald-100 text-emerald-800 border-emerald-200",
    Gospels: "bg-amber-100 text-amber-800 border-amber-200",
    "Paul's Letters": "bg-indigo-100 text-indigo-800 border-indigo-200",
    "General Letters": "bg-teal-100 text-teal-800 border-teal-200",
    Prophecy: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8" />
            The Holy Bible
          </h1>
          <p className="text-gray-600">
            King James Version - 66 Books, 1,189 Chapters
          </p>
        </div>

        <Card className="mb-8 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Search verses... (e.g., 'love', 'peace', 'forgive')"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") setShowSearchResults(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-amber-300 focus-visible:ring-amber-500"
              />
              {showSearchResults && (
                <Button
                  variant="outline"
                  onClick={clearSearch}
                  className="border-amber-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={handleSearch}
                className="bg-amber-800 hover:bg-amber-700"
              >
                <Search className="w-4 h-4 mr-1" />
                Search
              </Button>
            </div>

            {showSearchResults && searchResults && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">
                  Found {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                </p>
                <ScrollArea className="h-80">
                  <div className="space-y-2">
                    {searchResults.map((result, idx) => (
                      <Link
                        key={idx}
                        to={`/bible/${result.bookId}/${result.chapter}`}
                        className="block p-3 rounded-lg bg-white border border-amber-100 hover:border-amber-300 hover:shadow-sm transition-all"
                      >
                        <p className="text-xs text-amber-700 font-medium mb-1">
                          {result.bookName} {result.chapter}:{result.verse}
                        </p>
                        <p className="text-sm text-gray-700">{result.text}</p>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>

        {!showSearchResults && (
          <Tabs defaultValue="old" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-amber-100 mb-6">
              <TabsTrigger
                value="old"
                className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
              >
                Old Testament ({oldTestament.length} books)
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
              >
                New Testament ({newTestament.length} books)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="old">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {oldTestament.map((book) => (
                  <BookCard key={book.id} book={book} genreColors={genreColors} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {newTestament.map((book) => (
                  <BookCard key={book.id} book={book} genreColors={genreColors} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function BookCard({
  book,
  genreColors,
}: {
  book: {
    id: string;
    name: string;
    testament: string;
    genre: string;
    chapters: number;
    abbrev: string;
  };
  genreColors: Record<string, string>;
}) {
  return (
    <Link to={`/bible/${book.id}`}>
      <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5 border-amber-200 cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-amber-900 truncate">
                {book.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {book.chapters} chapters
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
          </div>
          <span
            className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${
              genreColors[book.genre] || "bg-gray-100 text-gray-800"
            }`}
          >
            {book.genre}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
