import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bible from "./pages/Bible";
import BookView from "./pages/BookView";
import ChapterView from "./pages/ChapterView";
import Prayers from "./pages/Prayers";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/bible/:bookId" element={<BookView />} />
          <Route path="/bible/:bookId/:chapter" element={<ChapterView />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
