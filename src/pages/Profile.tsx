import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  BookOpen,
  MessageCircle,
  LogOut,
  Sparkles,
  Mail,
  Shield,
} from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="border-amber-200 text-center">
            <CardContent className="py-12">
              <User className="w-16 h-16 mx-auto mb-4 text-amber-400" />
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                Your Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to view your profile, manage favorites, and join the
                community chat.
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-amber-800 hover:bg-amber-700 text-white"
                >
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
            <User className="w-8 h-8" />
            My Profile
          </h1>
        </div>

        <Card className="border-amber-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || ""}
                  className="w-20 h-20 rounded-full border-2 border-amber-400 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center shadow-md">
                  <User className="w-10 h-10 text-amber-600" />
                </div>
              )}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold text-amber-900">
                  {user?.name || "Believer"}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1">
                  {user?.email && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </span>
                  )}
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {user?.role === "admin" ? "Admin" : "Member"}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold text-amber-900 mb-3">
          Quick Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link to="/favorites">
            <Card className="border-amber-200 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-5 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-500 fill-red-500" />
                <h4 className="font-semibold text-amber-900">Favorites</h4>
                <p className="text-sm text-gray-500 mt-1">
                  View saved verses
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/bible">
            <Card className="border-amber-200 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-5 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-amber-700" />
                <h4 className="font-semibold text-amber-900">Read Bible</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Continue reading
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/chat">
            <Card className="border-amber-200 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-5 text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-amber-700" />
                <h4 className="font-semibold text-amber-900">Community</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Join the chat
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              &ldquo;But seek ye first the kingdom of God, and his righteousness; and
              all these things shall be added unto you.&rdquo; - Matthew 6:33
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Keep reading, praying, and growing in your faith. We are glad to
              have you as part of our community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
