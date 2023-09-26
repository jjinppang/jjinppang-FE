/*global kakao*/
import React, { useEffect } from "react";
import axios from "axios";

const Map = ({ searchResults }) => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) { // kakao 객체와 kakao.maps 객체가 있는지 확인
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

           // bounds_changed 이벤트 리스너 등록
           kakao.maps.event.addListener(map, 'bounds_changed', function() {
             var bounds = map.getBounds(); // 현재 지도 영역의 경계 좌표 객체 가져오기

             var swLatLng = bounds.getSouthWest(); // 남서쪽 좌표
             var neLatLng = bounds.getNorthEast(); // 북동쪽 좌표
  
             var topLat = neLatLng.getLat(); // 상단 위도 값
             var bottomLat = swLatLng.getLat(); // 하단 위도 값
             var bottomLng = neLatLng.getLng(); // 왼쪽 경계 경로 값
             var topLng = swLatLng.getLng(); // 오른쪽 경계 경로 값

  
              const requestParams ={
                topLat: topLat,
                bottomLat: bottomLat,
                topLng: bottomLng,
                bottomLng: topLng ,
                level : 2,
                rentType: "string"
              }

               const fetchMarkers= async ()=>{   try {
                const response = await axios.get(
                  "http://52.79.161.114/api/region/markers",
                  {
                    params: requestParams,
                  }
                );
    
                console.log(response.data);
              } catch (error) {
                console.error(error);
              }}

               fetchMarkers();

           });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [searchResults]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
