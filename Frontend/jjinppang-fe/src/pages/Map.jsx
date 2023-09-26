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

  // 지도 생성
var map = new kakao.maps.Map(document.getElementById('map'), {
  center: new kakao.maps.LatLng(37.5665, 126.9780), // 중심점 좌표 설정
  level: 8 // 초기 줌 레벨 설정
});

// bounds_changed 이벤트 리스너 등록
kakao.maps.event.addListener(map, 'bounds_changed', function() {
  var bounds = map.getBounds(); // 현재 지도 영역의 경계 좌표 객체 가져오기

  var topLat = bounds.getNorth(); // 상단 위도 값
  var bottomLat = bounds.getSouth(); // 하단 위도 값
  var topLng = bounds.getWest(); // 왼쪽 경계 경로 값
  var bottomLng = bounds.getEast(); // 오른쪽 경계 경로 값

  // 얻은 값을 활용하여 API 요청 등 필요한 작업을 수행합니다.
  // URL 구성
  var url = 'http://52.79.161.114/api/region/markers?' +
            'topLat=' + topLat +
            '&bottomLat=' + bottomLat +
            '&topLng=' + topLng +
            '&bottomLng=' + bottomLng +
            '&level=0&rentType=string';

  // Fetch API로 GET 요청 보내기
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // 응답 데이터 처리
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
