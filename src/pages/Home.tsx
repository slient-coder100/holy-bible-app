import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MessageCircle,
  HeartHandshake,
  ChevronRight,
  Sparkles,
  Heart,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { data: dailyVerse } = trpc.bible.getDailyVerse.useQuery();
  const { data: todayPrayers } = trpc.prayer.today.useQuery();
  const { isAuthenticated } = useAuth();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = dayNames[new Date().getDay()];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-800" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:20px_20px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-amber-200 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Your Daily Source of Inspiration</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
            Holy Bible App
          </h1>
          <p className="text-lg sm:text-xl text-amber-100 max-w-2xl mx-auto mb-8">
            Read Scripture, find daily prayers, and connect with a community of
            believers all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/bible">
              <Button
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Read Bible
              </Button>
            </Link>
            <Link to="/prayers">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <HeartHandshake className="w-5 h-5 mr-2" />
                Daily Prayers
              </Button>
            </Link>
            <Link to="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Users className="w-5 h-5 mr-2" />
                Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {dailyVerse && dailyVerse.text && (
          <section>
            <Card className="bg-gradient-to-br from-amber-100 to-orange-50 border-amber-200 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <Sparkles className="w-5 h-5" />
                  <CardTitle className="text-lg">Verse of the Day</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-xl sm:text-2xl text-amber-900 font-serif italic leading-relaxed mb-3">
                  &ldquo;{dailyVerse.text}&rdquo;
                </blockquote>
                <p className="text-amber-700 font-medium">
                  {dailyVerse.reference}
                </p>
                <div className="mt-4">
                  <Link to={`/bible/${dailyVerse.bookId}/${dailyVerse.chapter}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-400 text-amber-800 hover:bg-amber-200"
                    >
                      Read Full Chapter
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6" />
            {today}&rsquo;s Prayers
          </h2>
          {todayPrayers && todayPrayers.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {todayPrayers.map((prayer) => (
                <Card
                  key={prayer.id}
                  className="hover:shadow-lg transition-shadow border-amber-200"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-amber-900">
                      {prayer.title}
                    </CardTitle>
                    <p className="text-xs text-amber-600">
                      {prayer.category} &bull; {prayer.scriptureRef}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 line-clamp-4">
                      {prayer.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-amber-200">
              <CardContent className="py-8 text-center text-gray-500">
                <HeartHandshake className="w-12 h-12 mx-auto mb-3 text-amber-300" />
                <p>No prayers available for today.</p>
              </CardContent>
            </Card>
          )}
          <div className="mt-4 text-center">
            <Link to="/prayers">
              <Button
                variant="outline"
                className="border-amber-400 text-amber-800 hover:bg-amber-100"
              >
                View All Prayers
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Explore
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/bible">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5 border-amber-200 h-full cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 text-amber-700" />
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Read the Bible
                  </h3>
                  <p className="text-sm text-gray-500">
                    Explore all 66 books with chapters and verses
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/prayers">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5 border-amber-200 h-full cursor-pointer">
                <CardContent className="p-6 text-center">
                  <HeartHandshake className="w-10 h-10 mx-auto mb-3 text-amber-700" />
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Daily Prayers
                  </h3>
                  <p className="text-sm text-gray-500">
                    Prayers for every day of the week
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/chat">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5 border-amber-200 h-full cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-10 h-10 mx-auto mb-3 text-amber-700" />
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Community Chat
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isAuthenticated
                      ? "Connect with other believers"
                      : "Sign in to join the conversation"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
