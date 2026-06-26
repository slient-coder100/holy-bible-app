import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  LogIn,
  User,
  Clock,
} from "lucide-react";

export default function Chat() {
  const { isAuthenticated, user } = useAuth();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = trpc.chat.list.useQuery(undefined, {
    refetchInterval: 5000,
  });

  const utils = trpc.useUtils();
  const sendMessage = trpc.chat.send.useMutation({
    onSuccess: () => {
      utils.chat.list.invalidate();
      setMessage("");
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage.mutate({ message: message.trim() });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="border-amber-200 text-center">
            <CardContent className="py-12">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-amber-400" />
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                Community Chat
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Join our community of believers! Share prayers, encouragement,
                and fellowship with others. Sign in to participate.
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-amber-800 hover:bg-amber-700 text-white"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In to Join the Chat
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                You can still read the Bible and prayers without signing in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
            <MessageCircle className="w-8 h-8" />
            Community Chat
          </h1>
          <p className="text-gray-600">
            Share encouragement and fellowship with fellow believers
          </p>
        </div>

        <Card className="border-amber-200 h-[calc(100vh-280px)] min-h-[400px] flex flex-col">
          <CardHeader className="pb-3 border-b border-amber-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <CardTitle className="text-sm text-amber-900">
                  Live Chat ({messages?.length || 0} messages)
                </CardTitle>
              </div>
              <span className="text-xs text-gray-500">
                {user?.name || "You"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4" ref={scrollRef}>
              {isLoading ? (
                <div className="text-center text-gray-400 py-8">
                  Loading messages...
                </div>
              ) : !messages || messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-amber-200" />
                  <p>No messages yet. Be the first to share!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const isMine = msg.userId === Number(user?.id);
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          isMine ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {msg.userAvatar ? (
                            <img
                              src={msg.userAvatar}
                              alt={msg.userName}
                              className="w-8 h-8 rounded-full border border-amber-200"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                              <User className="w-4 h-4 text-amber-600" />
                            </div>
                          )}
                        </div>
                        <div
                          className={`max-w-[75%] ${
                            isMine ? "text-right" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-0.5 justify-center">
                            <span className="text-xs font-medium text-amber-800">
                              {msg.userName}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {formatTime(msg.createdAt)}
                            </span>
                          </div>
                          <div
                            className={`inline-block px-3 py-2 rounded-lg text-sm ${
                              isMine
                                ? "bg-amber-800 text-white"
                                : "bg-white border border-amber-200 text-gray-800"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t border-amber-100">
            <div className="flex gap-2">
              <Input
                placeholder="Share a prayer, verse, or encouragement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="border-amber-300 focus-visible:ring-amber-500"
                maxLength={1000}
              />
              <Button
                onClick={handleSend}
                disabled={!message.trim() || sendMessage.isPending}
                className="bg-amber-800 hover:bg-amber-700 px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
