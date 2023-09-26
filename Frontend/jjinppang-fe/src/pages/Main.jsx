import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { search } from "../apis/search";
import Map from "./Map";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const data = await search(searchTerm);
      setSearchResults(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainpage-layout">
      <InformationMain />
      <div className="mt-60 mb-20">
        <div className="mainpage-font">나에게 딱 맞는</div>
        <div className="mainpage-font">동네를 찾아 보세요!</div>
      </div>
      <div className="relative flex-1">
        <div className="relative">
          <input
            className="mainpage-search rounded-full px-4 py-2 pr-12"
            type="text"
            placeholder="지역 또는 건물명을 입력하세요."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <SearchIcon />
          </button>
        </div>
        <div class=" rounded-b-lg border border-line bg-white ">
          {searchResults.map((result) => (
            <div key={result.code}>{result.full_name}</div>
          ))}
        </div>
      </div>
      <Map searchResults={searchResults} /> {/* Pass searchResults as a prop */}
    </div>
  );
}

export default Main;
