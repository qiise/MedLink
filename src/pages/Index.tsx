
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForumCard = ({ title, path }: { title: string; path: string }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(path)}
      className="bg-[#D3E4FD] p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer border border-[#C0D8F7] hover:scale-[1.02] animate-scale-in backdrop-blur-sm"
    >
      <h3 className="text-gray-800 font-medium">{title}</h3>
    </div>
  );
};

const Index = () => {
  const forumThreads = [
    { title: "General Discussion", path: "/general" },
    { title: "Technical Support", path: "/support" },
    { title: "Feature Requests", path: "/features" },
    { title: "Bug Reports", path: "/bugs" },
    { title: "Community Events", path: "/events" },
    { title: "Product Updates", path: "/updates" },
    { title: "Best Practices", path: "/practices" },
    { title: "Tutorials", path: "/tutorials" },
    { title: "Resources", path: "/resources" },
    { title: "Announcements", path: "/announcements" },
    { title: "Questions & Answers", path: "/qa" },
    { title: "Off-Topic", path: "/offtopic" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <header className="bg-black bg-opacity-90 text-white p-4 fixed top-0 w-full z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
            CompanyName
          </div>
          
          <div className="text-xl font-medium tracking-wide absolute left-1/2 -translate-x-1/2">
            FORUM
          </div>
          
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome to the Forum Page!
          </h1>
          <p className="text-lg text-gray-600">
            Please pick a thread you would like to explore.
          </p>
        </div>

        {/* Forum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {forumThreads.map((thread, index) => (
            <ForumCard key={index} title={thread.title} path={thread.path} />
          ))}
        </div>

        {/* Heartbeat Line */}
        <div className="w-full h-px bg-[#0EA5E9] mt-12 heartbeat-line origin-left"></div>
      </main>
    </div>
  );
};

export default Index;
