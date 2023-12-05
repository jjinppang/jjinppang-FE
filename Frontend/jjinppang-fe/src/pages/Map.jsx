/*global kakao*/
import React, { useEffect } from "react";
import axios from "axios";

const Map = ({ searchResults }) => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
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

          const requestParams = {
            topLat: 0,
            bottomLat: 0,
            topLng: 0,
            bottomLng: 0,
            level: 2,
            rentType: "string",
          };

          var markerPosition = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          var marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          kakao.maps.event.addListener(map, "bounds_changed", function () {
            var bounds = map.getBounds();
            var swLatLng = bounds.getSouthWest();
            var neLatLng = bounds.getNorthEast();
            var topLat = neLatLng.getLat();
            var bottomLat = swLatLng.getLat();
            var bottomLng = neLatLng.getLng();
            var topLng = swLatLng.getLng();

            requestParams.topLat = topLat;
            requestParams.bottomLat = bottomLat;
            requestParams.topLng = bottomLng;
            requestParams.bottomLng = topLng;

            const fetchMarkers = async () => {
              try {
                const response = await axios.get(
                  "http://52.79.161.114/api/region/markers",
                  {
                    params: requestParams,
                  }
                );

                response.data.data.forEach((markerInfo) => {
                  var markerPosition = new kakao.maps.LatLng(
                    markerInfo.centerLat,
                    markerInfo.centerLng
                  );

                  var content = `
  <div style="position: relative; padding: 10px; background-color: #BCB2FC; border-radius: 5px; text-align: center; color: white;">
    <div style="position: absolute; top: 100%; left: 50%; margin-left: -10px; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #BCB2FC;"></div>
    <div style="font-weight: bold;">${markerInfo.sigunguName}</div>
    <div><strong>보증금:</strong> ${markerInfo.depositPrice}</div>
    <div><strong>월세:</strong> ${markerInfo.monthlyPrice}</div>
  </div>
`;
                  var customOverlay = new kakao.maps.CustomOverlay({
                    content: content,
                    position: markerPosition,
                  });

                  customOverlay.setMap(map);

                  kakao.maps.event.addListener(
                    customOverlay,
                    "click",
                    function () {
                      customOverlay.setMap(null);
                    }
                  );
                });
              } catch (error) {
                console.error(error);
              }
            };

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
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
        }}
      ></div>
    </div>
  );
};

export default Map;
