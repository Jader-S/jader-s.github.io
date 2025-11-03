import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  lat?: number
  lng?: number
  addressHtml?: string
  height?: number
  zoom?: number
}

export default function CompanyMap({ lat=50.1109, lng=8.6821, addressHtml='<strong>Valiant Global Foods</strong><br/>Frankfurt, Germany', height = 360, zoom = 15 }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletRef = useRef<{ mapInstance: L.Map; markerInstance: L.Marker; tileLayer: L.TileLayer } | null>(null)

  useEffect(() => {
    let mapInstance: L.Map | null = null
    let markerInstance: L.Marker | null = null
    let tileLayer: L.TileLayer | null = null

    // Fix default icon URLs in bundlers
    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -28],
    })

    if (mapRef.current) {
      mapInstance = L.map(mapRef.current, { scrollWheelZoom: false })
      mapInstance.setView([lat, lng], zoom)

      tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance)

      markerInstance = L.marker([lat, lng], { icon }).addTo(mapInstance)
      markerInstance.bindPopup(addressHtml)

      leafletRef.current = { mapInstance, markerInstance, tileLayer }
    }

    return () => {
      const current = leafletRef.current
      if (current) {
        if (current.markerInstance) current.markerInstance.remove()
        if (current.tileLayer) current.tileLayer.remove()
        if (current.mapInstance) current.mapInstance.remove()
      }
      leafletRef.current = null
    }
  }, [lat, lng, addressHtml, zoom])

  return (
    <div ref={mapRef} style={{ height, width: '100%' }} />
  )
}


