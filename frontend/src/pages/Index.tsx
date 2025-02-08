
import { useState } from "react";
import { NavTabs } from "@/components/NavTabs";
import { ForumTab } from "@/components/forum/ForumTab";
import { MentorshipTab } from "@/components/mentorship/MentorshipTab";
import { ArrowDown } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("forum");

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to PreMed Pals Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow pre-med students, share experiences, and find mentorship
            on your journey to medical school.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveTab("forum")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Join Discussions
            </button>
            <button 
              onClick={() => setActiveTab("mentorship")}
              className="px-6 py-3 bg-accent text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
            >
              Find a Mentor
            </button>
          </div>
          <div className="pt-12 animate-bounce">
            <ArrowDown className="mx-auto text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation and Content */}
      <main className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up">
          <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="mt-8">
            {activeTab === "forum" ? (
              <ForumTab />
            ) : (
              <MentorshipTab />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
