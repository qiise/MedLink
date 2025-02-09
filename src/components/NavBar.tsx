
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const NavBar = () => {
  const location = useLocation();
  const [isAuthenticated] = useState(false); // This would normally come from auth context
  const [name] = useState("John Doe"); // This would normally come from auth context

  let navBarText = "";
  if(location.pathname === "/profiles"){
    navBarText="MENTORSHIP";
  }else if(location.pathname ==="/login"){
    navBarText = "LOGIN";
  }
  

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  🏠︎
                </Link>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
            {navBarText && (
              <span className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium font-bold">
                {navBarText}
                </span>
            )}
          </div>  
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
