/*global kakao*/
import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    var container = document.getElementById("map");

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vh", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
