import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const StatCard = ({ 
  title, 
  value, 
  subValue, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'forest', 
  delay = 0 
}) => {
  const colorClasses = {
    forest: {
      bg: 'bg-forest-50',
      border: 'border-forest-200',
      icon: 'text-forest-600',
      title: 'text-forest-800',
      value: 'text-forest-900',
      subValue: 'text-forest-600'
    },
    earth: {
      bg: 'bg-earth-50',
      border: 'border-earth-200',
      icon: 'text-earth-600',
      title: 'text-earth-800',
      value: 'text-earth-900',
      subValue: 'text-earth-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-800',
      value: 'text-green-900',
      subValue: 'text-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-800',
      value: 'text-yellow-900',
      subValue: 'text-yellow-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-800',
      value: 'text-red-900',
      subValue: 'text-red-600'
    }
  }

  const classes = colorClasses[color] || colorClasses.forest

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3" />
    if (trend === 'down') return <TrendingDown className="w-3 h-3" />
    return <Minus className="w-3 h-3" />
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <motion.div
      className={`p-6 ${classes.bg} ${classes.border} border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-medium ${classes.title}`}>{title}</h3>
        {Icon && (
          <div className={`p-2 ${classes.bg} rounded-lg`}>
            <Icon className={`w-5 h-5 ${classes.icon}`} />
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="mb-2">
        <motion.p 
          className={`text-3xl font-bold ${classes.value}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
        {subValue && (
          <p className={`text-sm ${classes.subValue} mt-1`}>
            {subValue}
          </p>
        )}
      </div>

      {/* Trend Indicator */}
      {trend && trendValue && (
        <motion.div 
          className={`flex items-center space-x-1 ${getTrendColor()}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
        >
          {getTrendIcon()}
          <span className="text-xs font-medium">
            {trendValue}
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </motion.div>
      )}

      {/* Progress Bar (optional) */}
      {typeof value === 'number' && subValue && subValue.includes('%') && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div
              className={`h-1.5 rounded-full bg-gradient-to-r ${
                color === 'green' ? 'from-green-400 to-green-600' :
                color === 'yellow' ? 'from-yellow-400 to-yellow-600' :
                color === 'red' ? 'from-red-400 to-red-600' :
                'from-forest-400 to-forest-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(value, 100)}%` }}
              transition={{ duration: 1, delay: delay + 0.6 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default StatCard