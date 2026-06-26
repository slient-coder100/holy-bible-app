import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Trash2,
  BookOpen,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";

export default function Favorites() {
  const { isAuthenticated } = useAuth();
  const { data: favorites, isLoading } = trpc.favorite.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const utils = trpc.useUtils();
  const removeFavorite = trpc.favorite.remove.useMutation({
    onSuccess: () => {
      utils.favorite.list.invalidate();
      toast.success("Removed from favorites");
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="border-amber-200 text-center">
            <CardContent className="py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-amber-400" />
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                My Favorite Verses
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Save your favorite verses while reading the Bible. Sign in to
                start building your collection.
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-amber-800 hover:bg-amber-700 text-white"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            My Favorite Verses
          </h1>
          <p className="text-gray-600">
            Verses you&rsquo;ve saved while reading the Bible
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">
            Loading favorites...
          </div>
        ) : !favorites || favorites.length === 0 ? (
          <Card className="border-amber-200 text-center">
            <CardContent className="py-12">
              <Heart className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <p className="text-gray-500 mb-4">
                You haven&rsquo;t saved any favorite verses yet.
              </p>
              <Link to="/bible">
                <Button
                  variant="outline"
                  className="border-amber-400 text-amber-800 hover:bg-amber-100"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Reading
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => (
              <Card
                key={fav.id}
                className="border-amber-200 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          to={`/bible/${fav.bookId}/${fav.chapter}`}
                          className="text-sm font-medium text-amber-700 hover:text-amber-900"
                        >
                          {fav.bookId.charAt(0).toUpperCase() +
                            fav.bookId.slice(1)}{" "}
                          {fav.chapter}:{fav.verse}
                        </Link>
                      </div>
                      <p className="text-gray-800 italic">
                        &ldquo;{fav.text}&rdquo;
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite.mutate({ id: fav.id })}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
