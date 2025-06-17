'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMap() {
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    const loadGoogleMap = async () => {
      if (!window.google?.maps) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      const coords = { lat: 10.8231, lng: 106.6297 } // Vietnam office coordinates
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: coords,
        zoom: 15
      })
      
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }

      markerRef.current = new window.google.maps.Marker({
        position: coords,
        map: map
      })
    }

    loadGoogleMap()

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full" />
} 