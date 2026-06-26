import { Link, useParams } from "react-router";
import { trpc } from "@/providers/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronLeft,
  Hash,
} from "lucide-react";

export default function BookView() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book } = trpc.bible.getBook.useQuery(
    { bookId: bookId! },
    { enabled: !!bookId }
  );

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-gray-500">Book not found</p>
      </div>
    );
  }

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/bible">
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-700 hover:bg-amber-100"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              All Books
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8" />
            {book.name}
          </h1>
          <p className="text-gray-600">
            {book.genre} &bull; {book.chapters} chapters &bull; {book.testament === "old" ? "Old Testament" : "New Testament"}
          </p>
        </div>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Select Chapter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {chapters.map((ch) => (
                <Link key={ch} to={`/bible/${book.id}/${ch}`}>
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 hover:bg-amber-800 hover:text-white hover:border-amber-800 transition-colors"
                  >
                    {ch}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
