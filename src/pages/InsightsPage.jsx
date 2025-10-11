import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, TrendingUp, RefreshCw, Filter } from 'lucide-react'
import AIInsightCard from '../components/AIInsightCard'
import aiInsights from '../data/aiInsights.json'

const InsightsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const filterOptions = [
    { id: 'all', label: 'All Insights', icon: Brain },
    { id: 'predictions', label: 'Predictions', icon: Brain },
    { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
    { id: 'risks', label: 'Risk Analysis', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-earth-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-forest-800 mb-2">🤖 AI Insights</h1>
              <p className="text-forest-600">
                Machine learning powered analytics for tribal land rights management
              </p>
            </div>
            <motion.button
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-forest-600 text-white px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-1 bg-white p-1 rounded-lg shadow-sm border border-forest-200 w-fit">
            {filterOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeFilter === option.id
                      ? 'bg-forest-100 text-forest-800 shadow-sm'
                      : 'text-forest-600 hover:text-forest-800 hover:bg-forest-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ML Model Status */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {Object.entries(aiInsights.mlModels).map(([key, model], index) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow-sm border border-forest-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-forest-800 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Accuracy:</span>
                  <span className="text-sm font-medium text-forest-800">{model.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-sm font-medium text-forest-800">{model.lastUpdated}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-forest-400 to-forest-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${model.accuracy}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Insights Grid */}
        <div className="space-y-8">
          {/* Predictions Section */}
          {(activeFilter === 'all' || activeFilter === 'predictions') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-forest-800 mb-6 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                AI Predictions
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInsights.predictions.map((prediction, index) => (
                  <AIInsightCard
                    key={prediction.id}
                    insight={prediction}
                    type="prediction"
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Anomaly Detection Section */}
          {(activeFilter === 'all' || activeFilter === 'anomalies') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-forest-800 mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Anomaly Alerts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {aiInsights.anomalyAlerts.map((alert, index) => (
                  <AIInsightCard
                    key={alert.id}
                    insight={alert}
                    type="anomaly"
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Risk Assessment Section */}
          {(activeFilter === 'all' || activeFilter === 'risks') && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-forest-800 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
                Risk Analysis
              </h2>
              
              {/* Deforestation Risk */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Deforestation Risk Assessment</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiInsights.riskAssessment.deforestationRisk.map((risk, index) => (
                    <AIInsightCard
                      key={`deforestation-${index}`}
                      insight={risk}
                      type="risk"
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>

              {/* Biodiversity Impact */}
              <div>
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Biodiversity Impact Analysis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiInsights.riskAssessment.biodiversityImpact.map((impact, index) => (
                    <motion.div
                      key={`biodiversity-${index}`}
                      className={`p-6 rounded-xl shadow-sm border transition-all duration-200 ${
                        impact.impactLevel === 'Positive' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-forest-800">{impact.village}</h4>
                          <p className={`text-sm font-medium ${
                            impact.impactLevel === 'Positive' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {impact.impactLevel} Impact
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-forest-800">{impact.score}/10</p>
                          <p className="text-xs text-gray-500">Impact Score</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{impact.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  )
}

export default InsightsPage