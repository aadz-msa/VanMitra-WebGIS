import React from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'

const AIInsightCard = ({ 
  insight, 
  type = 'prediction', 
  delay = 0 
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'prediction':
        return <Brain className="w-5 h-5 text-blue-600" />
      case 'anomaly':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'risk':
        return <TrendingUp className="w-5 h-5 text-yellow-600" />
      default:
        return <Brain className="w-5 h-5 text-blue-600" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'prediction':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800'
        }
      case 'anomaly':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800'
        }
      case 'risk':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800'
        }
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800'
        }
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High':
        return 'text-green-600'
      case 'Medium':
        return 'text-yellow-600'
      case 'Low':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const colors = getTypeColor()

  const renderPredictionCard = () => (
    <motion.div
      className={`p-6 ${colors.bg} ${colors.border} border rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${colors.bg} rounded-lg`}>
            {getTypeIcon()}
          </div>
          <div>
            <h3 className={`font-semibold ${colors.text}`}>{insight.type}</h3>
            <p className="text-sm text-gray-600">{insight.village}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
          {insight.confidence} Confidence
        </span>
      </div>

      {/* Probability/Value Display */}
      {insight.probability && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Approval Probability</span>
            <span className="text-2xl font-bold text-green-600">{insight.probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${insight.probability}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
            />
          </div>
        </div>
      )}

      {insight.estimatedMonths && (
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Estimated Processing Time</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{insight.estimatedMonths} months</p>
        </div>
      )}

      {/* Factors */}
      {insight.factors && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Factors:</h4>
          <ul className="space-y-1">
            {insight.factors.map((factor, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-gray-600">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )

  const renderAnomalyCard = () => (
    <motion.div
      className={`p-6 ${colors.bg} ${colors.border} border rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${colors.bg} rounded-lg`}>
            {getTypeIcon()}
          </div>
          <div>
            <h3 className={`font-semibold ${colors.text}`}>{insight.type}</h3>
            <p className="text-sm text-gray-600">{insight.village}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(insight.severity)}`}>
          {insight.severity}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4">{insight.description}</p>

      <div className="bg-white rounded-lg p-3 mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendation:</h4>
        <p className="text-sm text-gray-600">{insight.recommendation}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Alert ID: #{insight.id}</span>
        <span>{new Date(insight.timestamp).toLocaleDateString()}</span>
      </div>
    </motion.div>
  )

  const renderRiskCard = () => (
    <motion.div
      className={`p-6 ${colors.bg} ${colors.border} border rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${colors.bg} rounded-lg`}>
            {getTypeIcon()}
          </div>
          <div>
            <h3 className={`font-semibold ${colors.text}`}>{insight.riskLevel} Risk</h3>
            <p className="text-sm text-gray-600">{insight.village}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-yellow-600">{insight.score}/10</p>
          <p className="text-xs text-gray-500">Risk Score</p>
        </div>
      </div>

      {/* Risk Factors */}
      {insight.factors && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Factors:</h4>
          <ul className="space-y-1">
            {insight.factors.map((factor, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm">
                <XCircle className="w-3 h-3 text-red-500" />
                <span className="text-gray-600">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {insight.recommendations && (
        <div className="bg-white rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
          <ul className="space-y-1">
            {insight.recommendations.map((rec, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )

  switch (type) {
    case 'prediction':
      return renderPredictionCard()
    case 'anomaly':
      return renderAnomalyCard()
    case 'risk':
      return renderRiskCard()
    default:
      return renderPredictionCard()
  }
}

export default AIInsightCard