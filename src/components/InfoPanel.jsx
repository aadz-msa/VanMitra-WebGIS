import React from 'react'
import { motion } from 'framer-motion'
import { X, Users, FileText, Clock, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const InfoPanel = ({ village, onClose }) => {
  if (!village) return null

  const claimsData = [
    { name: 'Approved', value: village.claims.approved, color: '#22C55E' },
    { name: 'Pending', value: village.claims.pending, color: '#EAB308' },
    { name: 'Rejected', value: village.claims.rejected, color: '#EF4444' },
  ]

  const monthlyData = [
    { month: 'Jan', claims: 8 },
    { month: 'Feb', claims: 12 },
    { month: 'Mar', claims: 6 },
    { month: 'Apr', claims: 15 },
    { month: 'May', claims: 4 },
  ]

  return (
    <motion.div
      className="absolute top-4 right-4 w-96 bg-white rounded-xl shadow-xl border border-forest-200 z-30 max-h-[calc(100vh-2rem)] overflow-y-auto"
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-forest-100 p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest-800">{village.name}</h2>
            <p className="text-sm text-forest-600">{village.district} District</p>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-forest-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-forest-600" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Village Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-forest-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-forest-600" />
              <span className="text-sm font-medium text-forest-800">Population</span>
            </div>
            <p className="text-xl font-bold text-forest-800 mt-1">
              {village.population.toLocaleString()}
            </p>
          </div>
          <div className="bg-earth-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-earth-600" />
              <span className="text-sm font-medium text-earth-800">Total Claims</span>
            </div>
            <p className="text-xl font-bold text-earth-800 mt-1">
              {village.claims.total}
            </p>
          </div>
        </div>

        {/* FRA Status Badge */}
        <div className="text-center">
          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
            village.fraStatus === 'approved' ? 'bg-green-100 text-green-800' :
            village.fraStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {village.fraStatus === 'approved' ? '✅ ' : village.fraStatus === 'pending' ? '⏳ ' : '❌ '}
            FRA Status: {village.fraStatus.charAt(0).toUpperCase() + village.fraStatus.slice(1)}
          </span>
        </div>

        {/* Claims Distribution Chart */}
        <div>
          <h3 className="text-sm font-semibold text-forest-800 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Claims Distribution
          </h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={claimsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {claimsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, 'Claims']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {claimsData.map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-xs text-gray-600">{item.name}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div>
          <h3 className="text-sm font-semibold text-forest-800 mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Recent Activity
          </h3>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [value, 'Claims']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="claims" 
                  fill="#369936" 
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 pt-3 border-t border-forest-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-forest-600">Biodiversity Level:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              village.biodiversity === 'very_high' ? 'bg-green-100 text-green-800' :
              village.biodiversity === 'high' ? 'bg-green-100 text-green-700' :
              village.biodiversity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {village.biodiversity.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-forest-600">Deforestation Risk:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              village.deforestationRisk === 'low' ? 'bg-green-100 text-green-800' :
              village.deforestationRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {village.deforestationRisk.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-3">
          <motion.button
            className="flex-1 bg-forest-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-forest-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          <motion.button
            className="flex-1 bg-earth-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-earth-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Community Voice
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default InfoPanel