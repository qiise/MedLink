
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "@/components/SearchBar"; 

const Profiles = () => {
  // Placeholder data - in a real app, this would come from an API
  const profiles = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      connections: 500,
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 4,
      name: "Alex Kumar",
      role: "Product Manager",
      company: "InnovateCo",
      location: "Seattle, WA",
      connections: 612,
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Backend Developer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      connections: 345,
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];



  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className=" flex items-center justify-center text-3xl font-bold mb-8">Find a mentor today!

          </h1>

    
            <SearchBar />
        
          <div className="space-y-6">
            {profiles.map((profile) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {profile.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{profile.role}</p>
                    <p className="text-gray-500 mt-1">{profile.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{profile.location}</span>
                      <span>•</span>
                      <span>{profile.connections} connections</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Profiles;
