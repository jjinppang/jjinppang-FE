import React, { useState } from "react";
import axios from "axios"; // Axios 라이브러리 import
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import Navbar from "../components/Navbar";
import InformationMain from "../components/SideBar/Information/InformationMain";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://52.79.161.114/api/search`, {
        params: {
          keyword: searchTerm,
        },
      });
      const data = response.data;
      console.log(data);
      // data를 사용하여 화면에 표시
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="mainpage-layout">
      <InformationMain />
      <div className="mt-60 mb-20">
        <div className="mainpage-font">나에게 딱 맞는</div>
        <div className="mainpage-font">동네를 찾아 보세요!</div>
      </div>
      <div className="relative flex-1">
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
          className="absolute right-4 top-0 h-full flex items-center justify-center"
        >
          <SearchIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;