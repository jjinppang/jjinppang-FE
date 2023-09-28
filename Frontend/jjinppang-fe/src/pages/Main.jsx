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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainpage-layout">
      {/* <InformationMain /> */}
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
        <div className=" rounded-b-lg border border-line bg-white">
          {searchResults.length > 0 && (
            <div className="flex flex-row justify-around p-4">
              <div className="flex-shrink-0">
                <div className="text-blue-600 font-bold text-lg font-sans">
                  지역명
                </div>
                {searchResults.map((rs, index) => (
                  <div
                    className="flex-shrink-0 text-text2 font-noto font-medium text-base p-1"
                    key={index}
                  >
                    {rs.fullName}
                  </div>
                ))}
              </div>
              <div className="flex">
                <div className="h-280 flex-shrink-0 rounded-b-lg border-r border-line bg-white"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="text-blue-600 font-bold text-lg font-sans">
                  건물명
                </div>

                {searchResults.map((rs, index) => (
                  <div
                    className="flex-shrink-0 text-text2 font-noto font-medium text-base p-1"
                    key={index}
                  >
                    <div className="flex items-center">
                      <div>{rs.name}</div>
                      <div class="text-center font-noto-sans text-xs font-light leading-normal rounded-full border border-[var(--text,#838181)] border-opacity-10 ">
                        {rs.buildingType}
                      </div>
                    </div>
                    {rs.fullName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Map searchResults={searchResults} />
    </div>
  );
}

export default Main;
