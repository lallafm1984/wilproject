'use client'

import { useEffect, useRef } from 'react'

export default function KakaoMap({ location }) {
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    const loadKakaoMap = async () => {
      if (!window.kakao?.maps) {
        const script = document.createElement('script')
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
        await new Promise((resolve) => window.kakao.maps.load(resolve))
      }

      const { kakao } = window
      const coords = new kakao.maps.LatLng(location.lat, location.lng)
      
      const mapOptions = {
        center: coords,
        level: 3
      }

      const map = new kakao.maps.Map(mapRef.current, mapOptions)
      
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }

      markerRef.current = new kakao.maps.Marker({
        position: coords
      })
      
      markerRef.current.setMap(map)
    }

    if (location) {
      loadKakaoMap()
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
  }, [location])

  return <div ref={mapRef} className="w-full h-full" />
} 