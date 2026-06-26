import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartHandshake,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Prayers() {
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: dayPrayers } = trpc.prayer.byDay.useQuery({
    dayOfWeek: selectedDay,
  });

  const uniqueCategories = Array.from(
    new Set((dayPrayers || []).map((p) => p.category))
  );

  const filteredPrayers =
    selectedCategory === "All"
      ? dayPrayers || []
      : (dayPrayers || []).filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
            <HeartHandshake className="w-8 h-8" />
            Daily Prayers
          </h1>
          <p className="text-gray-600">
            Find prayers for every day of the week to guide your devotion
          </p>
        </div>

        <Card className="mb-6 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedDay((d) => (d === 0 ? 6 : d - 1))
                }
                className="text-amber-700 hover:bg-amber-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-lg font-semibold text-amber-900">
                {dayNames[selectedDay]}
                {selectedDay === today && (
                  <span className="text-sm font-normal text-amber-600 ml-2">
                    (Today)
                  </span>
                )}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedDay((d) => (d === 6 ? 0 : d + 1))
                }
                className="text-amber-700 hover:bg-amber-100"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {dayNames.map((name, idx) => (
                <Button
                  key={name}
                  variant={selectedDay === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(idx)}
                  className={
                    selectedDay === idx
                      ? "bg-amber-800 hover:bg-amber-700"
                      : "border-amber-300 text-amber-800 hover:bg-amber-100"
                  }
                >
                  {name.slice(0, 3)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {uniqueCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className={
                selectedCategory === "All"
                  ? "bg-amber-700 hover:bg-amber-600"
                  : "border-amber-200 text-amber-700 hover:bg-amber-50"
              }
            >
              All
            </Button>
            {uniqueCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "bg-amber-700 hover:bg-amber-600"
                    : "border-amber-200 text-amber-700 hover:bg-amber-50"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        )}

        {filteredPrayers.length > 0 ? (
          <div className="space-y-4">
            {filteredPrayers.map((prayer) => (
              <Card
                key={prayer.id}
                className="border-amber-200 hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg text-amber-900">
                        {prayer.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {prayer.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {prayer.scriptureRef}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {prayer.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-amber-200">
            <CardContent className="py-12 text-center text-gray-500">
              <HeartHandshake className="w-12 h-12 mx-auto mb-3 text-amber-300" />
              <p>No prayers found for this day and category.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
