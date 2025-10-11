import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Volume2, Play, BarChart3, TrendingUp, Users } from 'lucide-react'
import ChartWidget from '../components/ChartWidget'
import RecorderWidget from '../components/RecorderWidget'
import communityData from '../data/communityData.json'

const CommunityPage = () => {
  const [selectedVoiceNote, setSelectedVoiceNote] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const sentimentColors = {
    positive: '#22C55E',
    neutral: '#EAB308',
    negative: '#EF4444'
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😊'
      case 'negative':
        return '😞'
      default:
        return '😐'
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  }

  const overallSentimentData = [
    { name: 'Positive', value: communityData.sentimentAnalysis.overall.positive, color: sentimentColors.positive },
    { name: 'Neutral', value: communityData.sentimentAnalysis.overall.neutral, color: sentimentColors.neutral },
    { name: 'Negative', value: communityData.sentimentAnalysis.overall.negative, color: sentimentColors.negative }
  ]

  const feedbackTrendsData = communityData.feedbackTrends.map(item => ({
    month: item.month,
    positive: item.positive,
    neutral: item.neutral,
    negative: item.negative
  }))

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'voices', label: 'Voice Notes', icon: Volume2 },
    { id: 'record', label: 'Record', icon: MessageCircle }
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
          <h1 className="text-3xl font-bold text-forest-800 mb-2">🗣️ Community Voice</h1>
          <p className="text-forest-600">
            Sentiment analysis and community feedback from tribal communities
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-1 bg-white p-1 rounded-lg shadow-sm border border-forest-200 w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-forest-100 text-forest-800 shadow-sm'
                      : 'text-forest-600 hover:text-forest-800 hover:bg-forest-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Community Engagement Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-forest-200 p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-5 h-5 text-forest-600" />
                    <h3 className="font-semibold text-forest-800">Participants</h3>
                  </div>
                  <p className="text-3xl font-bold text-forest-900">{communityData.communityEngagement.totalParticipants}</p>
                  <p className="text-sm text-forest-600 mt-1">Total voices heard</p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-forest-200 p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Volume2 className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-forest-800">Active Voices</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600">{communityData.communityEngagement.activeVoices}</p>
                  <p className="text-sm text-forest-600 mt-1">Regular contributors</p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-forest-200 p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-forest-800">Response Time</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{communityData.communityEngagement.averageResponseTime}</p>
                  <p className="text-sm text-forest-600 mt-1">Average response</p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-forest-200 p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-forest-800">Languages</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-600">
                    {Object.keys(communityData.communityEngagement.languageDistribution).length}
                  </p>
                  <p className="text-sm text-forest-600 mt-1">Languages supported</p>
                </motion.div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Overall Sentiment */}
                <ChartWidget
                  title="Overall Sentiment Distribution"
                  type="donut"
                  data={overallSentimentData}
                  dataKey="value"
                  colors={[sentimentColors.positive, sentimentColors.neutral, sentimentColors.negative]}
                  height={300}
                />

                {/* Feedback Trends */}
                <ChartWidget
                  title="Sentiment Trends Over Time"
                  type="area"
                  data={feedbackTrendsData}
                  dataKey="positive"
                  xAxisKey="month"
                  colors={[sentimentColors.positive]}
                  height={300}
                />
              </div>

              {/* District-wise Sentiment */}
              <div className="bg-white rounded-xl shadow-sm border border-forest-200 p-6">
                <h3 className="text-lg font-semibold text-forest-800 mb-6">District-wise Sentiment Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {communityData.sentimentAnalysis.byDistrict.map((district, index) => (
                    <motion.div
                      key={district.district}
                      className="border border-forest-200 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-forest-800 mb-3">{district.district}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-600">Positive</span>
                          <span className="text-sm font-medium">{district.positive}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-green-500"
                            style={{ width: `${district.positive}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-yellow-600">Neutral</span>
                          <span className="text-sm font-medium">{district.neutral}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-yellow-500"
                            style={{ width: `${district.neutral}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-red-600">Negative</span>
                          <span className="text-sm font-medium">{district.negative}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-red-500"
                            style={{ width: `${district.negative}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Major Themes */}
              <div className="bg-white rounded-xl shadow-sm border border-forest-200 p-6">
                <h3 className="text-lg font-semibold text-forest-800 mb-6">Major Discussion Themes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {communityData.topicModeling.majorThemes.map((theme, index) => (
                    <motion.div
                      key={theme.theme}
                      className={`p-4 rounded-lg border ${getSentimentColor(theme.sentiment)}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{theme.theme}</h4>
                        <span className="text-sm">{getSentimentIcon(theme.sentiment)}</span>
                      </div>
                      <p className="text-sm opacity-75 mb-2">Frequency: {theme.frequency}%</p>
                      <div className="flex flex-wrap gap-1">
                        {theme.keywords.slice(0, 3).map((keyword, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-white rounded opacity-60">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Voice Notes Tab */}
          {activeTab === 'voices' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-forest-800">Community Voice Notes</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {communityData.voiceNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    className={`bg-white rounded-xl shadow-sm border p-6 ${getSentimentColor(note.sentiment)} border-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{note.village}</h3>
                        <p className="text-sm opacity-75">{note.speaker}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl">{getSentimentIcon(note.sentiment)}</span>
                        <p className="text-xs opacity-60">{note.duration}</p>
                      </div>
                    </div>

                    <p className="text-sm mb-4 italic">"{note.transcript}"</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.keywords.slice(0, 4).map((keyword, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white rounded opacity-60">
                          #{keyword}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-60">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                      <button className="flex items-center space-x-1 text-sm hover:opacity-75">
                        <Play className="w-3 h-3" />
                        <span>Play</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Record Tab */}
          {activeTab === 'record' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-sm border border-forest-200 p-8">
                <h2 className="text-xl font-bold text-forest-800 mb-6 text-center">
                  Record Your Voice
                </h2>
                <RecorderWidget />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommunityPage