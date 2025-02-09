const SearchBar = () => {
    return (
      <div className="flex items-center justify-center bg-white space-x-6 border border-gray-300 rounded-lg max-w-[700px] mx-auto">
        <button className="text-lg text-black rounded-md hover:text-[#0EA5E9] rounded-full transition-all duration-300">
            ⌕ 
        </button>
        <input
          type="text"
          placeholder = "Search names..."
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
      </div>
    );
  };
  
  export default SearchBar;