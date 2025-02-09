import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations

// Heartbeat Line Component (Stationary Base Line, Moving Peaks)
const HeartbeatLine = () => {
  return (
    <div className="absolute bottom--5 left-0 w-full overflow-hidden">
      <svg
        className="w-full h-16 md:h-24 lg:h-32 text-[#0EA5E9]"
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 10 H30 L35 2 L40 18 L45 10 H60 L65 5 L70 15 L75 10 H100 L105 5 L110 15 L115 10 H140 L145 2 L150 18 L155 10 H200"
          stroke="#add8e6"
          strokeWidth="0.5"
          fill="none"
          className="heartbeat-animation"
        />
      </svg>
    </div>
  );
};

// Forum Card Component
const ForumCard = ({ title, path }: { title: string; path: string }) => {
  const navigate = useNavigate();
  return (

  <div
    onClick={() => navigate(path)}
    className="bg-[#D3E4FD] p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer border border-[#C0D8F7] hover:scale-[1.02] animate-scale-in backdrop-blur-sm flex items-center justify-center"
  >
    <h3 className="text-gray-800 font-medium">{title}</h3>
  </div>

  );
};

// Index Component
const Index = () => {
  const forumThreads = [
    { title: "MCAT", path: "/MCAT" },
    { title: "Essays / Personal Statements", path: "/Essays" },
    { title: "AMCAs", path: "/AMCAs" },
    { title: "Letters of Recommendation", path: "/RecLetters" },
    { title: "Interviews", path: "/Interviews" },
    { title: "General / Secondary Applications", path: "/Applications" },
    { title: "Research", path: "/Research" },
    { title: "Extracurriculars", path: "/Extracurriculars" },
    { title: "Other Opportunities", path: "/Opportunities" },
    { title: "CASPer Test", path: "/CASPer" },
    { title: "Specific Med Schools", path: "/Schools" },
    { title: "Random", path: "/Random" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 20%, #0EA5E9 0%, transparent 50%),
             radial-gradient(circle at 75% 20%, #0EA5E9 0%, transparent 50%),
             black`,
            `radial-gradient(circle at 20% 20%, #0EA5E9 0%, transparent 55%),
             radial-gradient(circle at 80% 80%, #0EA5E9 0%, transparent 55%),
             black`,
            `radial-gradient(circle at 30% 30%, #0EA5E9 0%, transparent 50%),
             radial-gradient(circle at 75% 75%, #0EA5E9 0%, transparent 50%),
             black`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Dotted Pattern Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Main Content (kept above background using z-20) */}
      <div className="relative z-20">
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
            <h1 className="text-4xl font-bold text-white">
              Welcome to the Forum Page!
            </h1>
            <p className="text-2x1 text-gray-200">
              Please pick a thread you would like to explore.
            </p>
          </div>

          {/* Forum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {forumThreads.map((thread, index) => (
              <ForumCard key={index} title={thread.title} path={thread.path} />
            ))}
          </div>

          {/* Animated Heartbeat Line */}
          <HeartbeatLine />
        </main>
      </div>
    </div>
  );
};

export default Index;
