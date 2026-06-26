import { Link, useParams } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChapterView() {
  const { bookId, chapter } = useParams<{
    bookId: string;
    chapter: string;
  }>();
  const chapterNum = parseInt(chapter || "1");
  const { isAuthenticated } = useAuth();
  const [favoritedVerses, setFavoritedVerses] = useState<Set<number>>(
    new Set()
  );

  const { data: book } = trpc.bible.getBook.useQuery(
    { bookId: bookId! },
    { enabled: !!bookId }
  );

  const { data: chapterData } = trpc.bible.getChapter.useQuery(
    { bookId: bookId!, chapter: chapterNum },
    { enabled: !!bookId }
  );

  const utils = trpc.useUtils();
  const addFavorite = trpc.favorite.add.useMutation({
    onSuccess: () => {
      utils.favorite.list.invalidate();
      toast.success("Verse added to favorites!");
    },
  });

  if (!book || !chapterData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const hasPrevious = chapterNum > 1;
  const hasNext = chapterNum < book.chapters;

  const handleFavorite = (verse: number, text: string) => {
    if (!isAuthenticated) {
      toast.info("Sign in to save favorites!");
      return;
    }
    if (favoritedVerses.has(verse)) return;

    addFavorite.mutate({
      bookId: book.id,
      chapter: chapterNum,
      verse,
      text,
    });
    setFavoritedVerses((prev) => new Set(prev).add(verse));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to={`/bible/${book.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-700 hover:bg-amber-100"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {book.name}
            </Button>
          </Link>
          <div className="flex gap-2">
            {hasPrevious && (
              <Link to={`/bible/${book.id}/${chapterNum - 1}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </Button>
              </Link>
            )}
            {hasNext && (
              <Link to={`/bible/${book.id}/${chapterNum + 1}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-1 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8" />
            {book.name} {chapterNum}
          </h1>
          <p className="text-gray-500 text-sm">
            {book.genre} &bull; King James Version
          </p>
        </div>

        <Card className="border-amber-200 shadow-md">
          <CardContent className="p-6 sm:p-8">
          {chapterData.isPartial && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm text-amber-800">
              This chapter preview is limited. Read the full Bible for complete text.
            </div>
          )}
            <div className="space-y-4">
              {chapterData.verses.map((v) => (
                <div
                  key={v.verse}
                  className="flex gap-3 group hover:bg-amber-50/50 p-2 rounded-lg transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                    {v.verse}
                  </span>
                  <p className="text-gray-800 leading-relaxed pt-1 flex-1">
                    {v.text}
                  </p>
                  <button
                    onClick={() => handleFavorite(v.verse, v.text)}
                    className={`flex-shrink-0 p-1 rounded-md transition-colors ${
                      favoritedVerses.has(v.verse)
                        ? "text-red-500"
                        : "text-gray-300 group-hover:text-gray-400 hover:text-red-400"
                    }`}
                    title="Add to favorites"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favoritedVerses.has(v.verse) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <Link to={`/bible/${book.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-700 hover:bg-amber-100"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              All Chapters
            </Button>
          </Link>
          <div className="flex gap-2">
            {hasPrevious && (
              <Link to={`/bible/${book.id}/${chapterNum - 1}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Chapter {chapterNum - 1}
                </Button>
              </Link>
            )}
            {hasNext && (
              <Link to={`/bible/${book.id}/${chapterNum + 1}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  Chapter {chapterNum + 1}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
