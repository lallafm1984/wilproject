'use client'

import { useEffect, useRef } from 'react'

export default function GoogleMap() {
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 10
    const retryDelay = 500 // ms

    const coords = { lat: 10.8231, lng: 106.6297 } // Vietnam office coordinates

    function initMap() {
      if (!window.google?.maps) return

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

    function tryInitMap() {
      if (typeof window !== 'undefined' && window.google?.maps) {
        initMap()
      } else if (retryCount < maxRetries) {
        retryCount++
        setTimeout(tryInitMap, retryDelay)
      }
    }

    tryInitMap()

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full" />
} 