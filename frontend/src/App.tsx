import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forum from "./pages/Forum";
import Profiles from "./pages/Profiles";
import MentorRequest from "./pages/MentorRequest";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import ChatbotPage from "./pages/ChatbotPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <NavBar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/post/:id" element={<PostDetail />} /> {/* Add route for post details */}
              <Route path="/mentor-request" element={<MentorRequest />} />
              <Route path="/chatbot" element={<ChatbotPage />} /> {/* Add route for chatbot */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;