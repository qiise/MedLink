
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isAuthenticated] = useState(false); // This would normally come from auth context
  const [name] = useState("John Doe"); // This would normally come from auth context

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Account
                </Link>
              </>
            ) : null}
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <span className="text-gray-600 text-sm font-medium">{name}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
