'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMap({ location, label }) {
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const infoWindowRef = useRef(null)

  useEffect(() => {
    const loadKakaoMap = async () => {
      if (!window.kakao?.maps) {
        const script = document.createElement('script')
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
        await new Promise((resolve) => window.kakao.maps.load(resolve))
      }

      const { kakao } = window
      let coords = null
      let map = null
      let marker = null
      let infoWindow = null

      // 주소가 있으면 addressSearch로 좌표 변환
      if (location?.address) {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(location.address, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            map = new kakao.maps.Map(mapRef.current, {
              center: coords,
              level: 3
            });
            marker = new kakao.maps.Marker({
              position: coords,
              map: map
            });
            if (label) {
              infoWindow = new kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${label}</div>`
              });
              infoWindow.open(map, marker);
            }
            map.setCenter(coords);
            markerRef.current = marker;
            infoWindowRef.current = infoWindow;
          }
        });
      } else if (location?.lat && location?.lng) {
        coords = new kakao.maps.LatLng(location.lat, location.lng);
        map = new kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 3
        });
        marker = new kakao.maps.Marker({
          position: coords,
          map: map
        });
        if (label) {
          infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${label}</div>`
          });
          infoWindow.open(map, marker);
        }
        map.setCenter(coords);
        markerRef.current = marker;
        infoWindowRef.current = infoWindow;
      }
    }

    if (location) {
      loadKakaoMap()
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close()
      }
    }
  }, [location, label])

  return <div ref={mapRef} className="w-full h-full" />
} 