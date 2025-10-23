import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ onSearch, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    onClose();
  };

  return (
    <div className="glass-effect border-b border-neon-blue/20 p-3">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search messages..."
          className="w-full bg-neon-dark/50 border border-neon-blue/30 rounded-full pl-10 pr-10 py-2 text-white focus:outline-none focus:border-neon-blue transition-all"
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="text-neon-blue text-xs mt-2">Press ESC to close search</p>
      )}
    </div>
  );
};

export default SearchBar;
