import React from 'react'
import { motion } from 'framer-motion'
import { Trees, Waves, Wheat, MapPin, Leaf } from 'lucide-react'

const LayerToggleGroup = ({ visibleLayers, onLayerToggle }) => {
  const layers = [
    {
      key: 'forestCover',
      name: 'Forest Cover',
      icon: Trees,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      key: 'waterBodies',
      name: 'Water Bodies',
      icon: Waves,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      key: 'farmLands',
      name: 'Farm Lands',
      icon: Wheat,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      key: 'fraClaims',
      name: 'FRA Claims',
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      key: 'biodiversity',
      name: 'Biodiversity',
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ]

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-forest-800 mb-3">Map Layers</h3>
      {layers.map((layer) => {
        const Icon = layer.icon
        const isVisible = visibleLayers[layer.key]
        
        return (
          <motion.div
            key={layer.key}
            className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              isVisible 
                ? `${layer.bgColor} ${layer.borderColor} shadow-sm` 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onLayerToggle(layer.key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Toggle Switch */}
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              isVisible ? 'bg-forest-500' : 'bg-gray-300'
            }`}>
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: isVisible ? 24 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </div>

            {/* Layer Icon */}
            <div className={`p-2 rounded-lg ${isVisible ? layer.bgColor : 'bg-gray-100'}`}>
              <Icon className={`w-4 h-4 ${isVisible ? layer.color : 'text-gray-500'}`} />
            </div>

            {/* Layer Info */}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                isVisible ? 'text-forest-800' : 'text-gray-600'
              }`}>
                {layer.name}
              </p>
              <p className="text-xs text-gray-500">
                {isVisible ? 'Visible' : 'Hidden'}
              </p>
            </div>

            {/* Visibility Indicator */}
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isVisible ? 'bg-green-500' : 'bg-gray-300'
              }`}
              animate={{
                scale: isVisible ? [1, 1.2, 1] : 1,
                opacity: isVisible ? [1, 0.7, 1] : 0.5
              }}
              transition={{
                duration: isVisible ? 1.5 : 0.3,
                repeat: isVisible ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )
      })}

      {/* Layer Count Summary */}
      <div className="mt-4 p-3 bg-forest-50 rounded-lg border border-forest-200">
        <p className="text-xs text-forest-600">
          <span className="font-medium">
            {Object.values(visibleLayers).filter(Boolean).length}
          </span> of {layers.length} layers visible
        </p>
        <div className="flex space-x-1 mt-2">
          {layers.map((layer) => (
            <div
              key={layer.key}
              className={`w-2 h-2 rounded-full ${
                visibleLayers[layer.key] ? 'bg-forest-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LayerToggleGroup