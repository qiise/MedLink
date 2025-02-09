import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("John Doe");

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("currentUser");
      setIsAuthenticated(!!user);  // Set authentication status based on user presence
      setName(user || "John Doe"); // Default to John Doe if no user
    };

    handleStorageChange();  // Check authentication status on initial load

    // Listen for login/logout events
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("storage"));  // Notify other components about logout
    navigate("/");  // Redirect to homepage
  };

  let navBarText = "";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              🏠︎
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  Logged in as {name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
            <Link to="/chatbot" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Chatbot
            </Link>
          </div>
          <div className="flex items-center">
            {navBarText && (
              <span className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium font-bold">
                {navBarText}
              </span>
            )}
            {location.pathname === "/profiles" && (
              <Link
                to="/Membership" 
                className="text-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Membership Prices
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
