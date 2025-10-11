import React, { useEffect, useState } from 'react'
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import mapData from '../data/mapData.json'
import InfoPanel from './InfoPanel'

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom marker icons
const createCustomIcon = (color, status) => {
  return L.divIcon({
    html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-lg" style="background-color: ${color}"></div>`,
    className: 'custom-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

const MapContainer = ({ visibleLayers, selectedVillage, onVillageSelect }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMarker, setSelectedMarker] = useState(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const getMarkerColor = (status) => {
    const colors = {
      approved: '#22C55E',
      pending: '#EAB308',
      rejected: '#EF4444'
    }
    return colors[status] || '#6B7280'
  }

  const handleMarkerClick = (village) => {
    setSelectedMarker(village)
    onVillageSelect(village)
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-forest-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-forest-200 border-t-forest-500 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-forest-600 font-medium">Loading WebGIS Map...</p>
          <p className="text-forest-400 text-sm mt-1">Initializing tribal land data</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <LeafletMapContainer
        center={[11.5, 76.5]}
        zoom={9}
        className="w-full h-full z-10"
        style={{ background: '#f0f9f0' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Forest Cover Layer */}
        {visibleLayers.forestCover && mapData.mapLayers.forestCover.data.map((area, index) => (
          <Polygon
            key={`forest-${index}`}
            positions={area.coordinates}
            pathOptions={{
              color: mapData.mapLayers.forestCover.color,
              fillColor: mapData.mapLayers.forestCover.color,
              fillOpacity: 0.3,
              weight: 2
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>Forest Cover</strong><br />
                Density: {area.density}%
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Water Bodies Layer */}
        {visibleLayers.waterBodies && mapData.mapLayers.waterBodies.data.map((water, index) => (
          <Polyline
            key={`water-${index}`}
            positions={water.coordinates}
            pathOptions={{
              color: mapData.mapLayers.waterBodies.color,
              weight: 4,
              opacity: 0.8
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{water.name}</strong><br />
                Type: River/Water Body
              </div>
            </Popup>
          </Polyline>
        ))}

        {/* Farm Lands Layer */}
        {visibleLayers.farmLands && mapData.mapLayers.farmLands.data.map((farm, index) => (
          <Polygon
            key={`farm-${index}`}
            positions={farm.coordinates}
            pathOptions={{
              color: mapData.mapLayers.farmLands.color,
              fillColor: mapData.mapLayers.farmLands.color,
              fillOpacity: 0.4,
              weight: 2,
              dashArray: '5, 5'
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>Farm Land</strong><br />
                Crop: {farm.cropType}
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Village Markers with FRA Status */}
        {visibleLayers.fraClaims && mapData.villages.map((village) => (
          <Marker
            key={village.id}
            position={village.coordinates}
            icon={createCustomIcon(getMarkerColor(village.fraStatus), village.fraStatus)}
            eventHandlers={{
              click: () => handleMarkerClick(village)
            }}
          >
            <Popup>
              <div className="text-sm min-w-48">
                <h3 className="font-semibold text-forest-800 mb-2">{village.name}</h3>
                <div className="space-y-1">
                  <p><strong>District:</strong> {village.district}</p>
                  <p><strong>Population:</strong> {village.population.toLocaleString()}</p>
                  <p><strong>FRA Status:</strong> 
                    <span className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
                      village.fraStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      village.fraStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {village.fraStatus.charAt(0).toUpperCase() + village.fraStatus.slice(1)}
                    </span>
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      <strong>Claims:</strong> {village.claims.total} total | 
                      {village.claims.approved} approved | 
                      {village.claims.pending} pending
                    </p>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Biodiversity Zones Layer */}
        {visibleLayers.biodiversity && mapData.villages.map((village) => (
          <motion.div key={`bio-${village.id}`}>
            {/* This would be actual biodiversity zone polygons in a real implementation */}
          </motion.div>
        ))}
      </LeafletMapContainer>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedMarker && (
          <InfoPanel
            village={selectedMarker}
            onClose={() => {
              setSelectedMarker(null)
              onVillageSelect(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Map Legend */}
      <motion.div
        className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-sm font-semibold text-forest-800 mb-2">FRA Status Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-700">Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-700">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-700">Rejected</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MapContainer