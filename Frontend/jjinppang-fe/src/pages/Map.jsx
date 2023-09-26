/*global kakao*/
import React, { useEffect } from "react";

import axios from "axios";

const Map = ({ searchResults }) => {
  useEffect(() => {
    var container = document.getElementById("map");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        var options = {
          center: new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          level: 3,
        };

        var map = new kakao.maps.Map(container, options);

        var markerPosition = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 현재 위치에 따라 요청 내용을 다르게 설정
        const requestParams = {
          topLat: position.coords.latitude + 1,
          bottomLat: position.coords.latitude - 1,
          topLng: position.coords.longitude + 1,
          bottomLng: position.coords.longitude - 1,
          level: 0,
        };

        // Axios로 데이터 요청 보내기
        try {
          const response = await axios.get(
            "http://52.79.161.114/api/region/markers",
            {
              params: requestParams,
            }
          );

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, [searchResults]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
