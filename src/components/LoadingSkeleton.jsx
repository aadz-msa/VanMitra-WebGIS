import React from 'react'
import { motion } from 'framer-motion'

const LoadingSkeleton = ({ 
  type = 'card', 
  count = 1, 
  height = '200px',
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-forest-200 p-6 ${className}`}>
            <div className="animate-pulse">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-forest-100 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-forest-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-forest-100 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-forest-100 rounded"></div>
                <div className="h-3 bg-forest-100 rounded w-5/6"></div>
                <div className="h-3 bg-forest-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        )

      case 'chart':
        return (
          <div className={`bg-white rounded-xl shadow-sm border border-forest-200 p-6 ${className}`}>
            <div className="animate-pulse">
              <div className="h-6 bg-forest-100 rounded w-1/3 mb-6"></div>
              <div className="space-y-2" style={{ height }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-end space-x-2 h-full">
                    {[...Array(6)].map((_, j) => (
                      <div
                        key={j}
                        className="bg-forest-100 rounded-t"
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          width: '100%'
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="space-y-2">
              <div className="h-4 bg-forest-100 rounded w-full"></div>
              <div className="h-4 bg-forest-100 rounded w-5/6"></div>
              <div className="h-4 bg-forest-100 rounded w-4/6"></div>
            </div>
          </div>
        )

      case 'map':
        return (
          <div className={`bg-forest-50 rounded-xl ${className}`} style={{ height }}>
            <div className="w-full h-full flex items-center justify-center">
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
                <p className="text-forest-600 font-medium">Loading Map...</p>
                <p className="text-forest-400 text-sm mt-1">Initializing layers</p>
              </motion.div>
            </div>
          </div>
        )

      case 'list':
        return (
          <div className={`space-y-4 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-forest-200 p-4">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-forest-100 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-forest-100 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-forest-100 rounded w-1/2"></div>
                    </div>
                    <div className="w-8 h-8 bg-forest-100 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div className={`animate-pulse bg-forest-100 rounded ${className}`} style={{ height }}>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {count > 1 && type !== 'list' ? (
        <div className="space-y-4">
          {[...Array(count)].map((_, i) => (
            <div key={i}>{renderSkeleton()}</div>
          ))}
        </div>
      ) : (
        renderSkeleton()
      )}
    </motion.div>
  )
}

export default LoadingSkeleton