import { useEffect, useRef } from 'react'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

type Props = {
  lat?: number
  lng?: number
  addressHtml?: string
  height?: number
  zoom?: number
}

// Create a custom icon instance to ensure it works in production
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function CompanyMap({ lat=50.1109, lng=8.6821, addressHtml='<strong>Valiant Global Foods</strong><br/>Frankfurt, Germany', height = 360, zoom = 15 }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletRef = useRef<{ mapInstance: L.Map; markerInstance: L.Marker; tileLayer: L.TileLayer } | null>(null)

  useEffect(() => {
    let mapInstance: L.Map | null = null
    let markerInstance: L.Marker | null = null
    let tileLayer: L.TileLayer | null = null

    // Set default icon for all markers
    L.Marker.prototype.options.icon = defaultIcon

    const init = () => {
      if (!mapRef.current) return
      if (leafletRef.current?.mapInstance) {
        // Already initialized; just update view/marker
        leafletRef.current.mapInstance.setView([lat, lng], zoom)
        leafletRef.current.markerInstance.setLatLng([lat, lng])
        leafletRef.current.markerInstance.bindPopup(addressHtml)
        return
      }
      mapInstance = L.map(mapRef.current, { scrollWheelZoom: false })
      mapInstance.setView([lat, lng], zoom)
      // Use the German OpenStreetMap tile mirror to improve availability in restricted networks
      tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance)
      markerInstance = L.marker([lat, lng], { icon: defaultIcon }).addTo(mapInstance)
      markerInstance.bindPopup(addressHtml)
      leafletRef.current = { mapInstance, markerInstance, tileLayer }
    }

    // Defer init to next frame to ensure container has layout size in prod
    const raf = requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(raf)
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
    <div ref={mapRef} style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%', minHeight: 200 }} />
  )
}


