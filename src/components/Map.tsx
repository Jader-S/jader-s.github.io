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

export default function CompanyMap({ lat=50.1109, lng=8.6821, addressHtml='<strong>Valiant Global Foods</strong><br/>Frankfurt, Germany', height = 360, zoom = 15 }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletRef = useRef<{ mapInstance: L.Map; markerInstance: L.Marker; tileLayer: L.TileLayer } | null>(null)

  useEffect(() => {
    let mapInstance: L.Map | null = null
    let markerInstance: L.Marker | null = null
    let tileLayer: L.TileLayer | null = null

    // Ensure Leaflet default icon works with bundlers (use local assets)
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
    })

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
      tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance)
      markerInstance = L.marker([lat, lng]).addTo(mapInstance)
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


