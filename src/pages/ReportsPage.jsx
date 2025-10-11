import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp, Users } from 'lucide-react'
import ChartWidget from '../components/ChartWidget'
import StatCard from '../components/StatCard'
import dashboardData from '../data/dashboardData.json'

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('yearly')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = (type) => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      // Simulate report generation
      console.log(`Generating ${type} report...`)
    }, 2000)
  }

  const reportTypes = [
    {
      id: 'summary',
      title: 'Executive Summary',
      description: 'High-level overview of FRA implementation progress',
      icon: BarChart3,
      color: 'forest'
    },
    {
      id: 'detailed',
      title: 'Detailed Analytics',
      description: 'Comprehensive analysis with village-level breakdowns',
      icon: PieChart,
      color: 'blue'
    },
    {
      id: 'trends',
      title: 'Trends Analysis',
      description: 'Historical trends and forecasting insights',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'community',
      title: 'Community Impact',
      description: 'Social impact assessment and community feedback',
      icon: Users,
      color: 'purple'
    }
  ]

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: '📄' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: '📊' },
    { id: 'csv', label: 'CSV Data', icon: '📋' }
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
          <h1 className="text-3xl font-bold text-forest-800 mb-2">📊 Reports & Analytics</h1>
          <p className="text-forest-600">
            Generate comprehensive reports and export data for analysis
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-forest-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-forest-800 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Report Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-2">
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-800 mb-2">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              >
                <option value="all">All Districts</option>
                <option value="wayanad">Wayanad</option>
                <option value="idukki">Idukki</option>
                <option value="palakkad">Palakkad</option>
                <option value="thrissur">Thrissur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-800 mb-2">
                Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  defaultValue="2024-01-01"
                />
                <input
                  type="date"
                  className="flex-1 p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  defaultValue="2024-12-31"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatCard
            title="Total Reports Generated"
            value="147"
            subValue="This year"
            icon={FileText}
            trend="up"
            trendValue="+23%"
            color="forest"
          />
          <StatCard
            title="Data Points Analyzed"
            value="15.2K"
            subValue="Records processed"
            icon={BarChart3}
            trend="up"
            trendValue="+456"
            color="blue"
          />
          <StatCard
            title="Export Downloads"
            value="89"
            subValue="This month"
            icon={Download}
            trend="up"
            trendValue="+12%"
            color="green"
          />
          <StatCard
            title="Report Accuracy"
            value="98.7%"
            subValue="Data integrity"
            icon={TrendingUp}
            trend="up"
            trendValue="+0.3%"
            color="purple"
          />
        </motion.div>

        {/* Report Templates */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-forest-800 mb-6">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report, index) => {
              const Icon = report.icon
              return (
                <motion.div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm border border-forest-200 p-6 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 bg-${report.color}-50 rounded-lg`}>
                        <Icon className={`w-6 h-6 text-${report.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-forest-800">{report.title}</h3>
                        <p className="text-sm text-forest-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {exportFormats.map((format) => (
                        <motion.button
                          key={format.id}
                          onClick={() => handleGenerateReport(report.id)}
                          disabled={isGenerating}
                          className="flex items-center space-x-1 px-3 py-2 text-xs bg-forest-100 text-forest-700 rounded-lg hover:bg-forest-200 transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{format.icon}</span>
                          <span>{format.label.split(' ')[0]}</span>
                        </motion.button>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={isGenerating}
                      className="flex items-center space-x-2 bg-forest-600 text-white px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Generate</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Sample Charts for Report Preview */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-forest-800">Report Preview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* District-wise Performance */}
            <ChartWidget
              title="District-wise Approval Rates"
              type="bar"
              data={dashboardData.districtWiseStats.map(district => ({
                district: district.district,
                approvalRate: district.approvalRate
              }))}
              dataKey="approvalRate"
              xAxisKey="district"
              colors={['#369936']}
              height={300}
            />

            {/* Processing Time Trends */}
            <ChartWidget
              title="Processing Time Analysis"
              type="line"
              data={dashboardData.claimsByYear.map(item => ({
                year: item.year,
                avgTime: Math.random() * 5 + 6 // Dummy processing time data
              }))}
              dataKey="avgTime"
              xAxisKey="year"
              colors={['#EAB308']}
              height={300}
            />
          </div>

          {/* Historical Trends */}
          <ChartWidget
            title="Historical Claims Trends"
            type="area"
            data={dashboardData.claimsByYear}
            dataKey="filed"
            xAxisKey="year"
            colors={['#22C55E']}
            height={350}
          />
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-forest-800 mb-6">Recent Reports</h2>
          <div className="bg-white rounded-xl shadow-sm border border-forest-200">
            <div className="p-6 border-b border-forest-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-forest-800">Generated Reports</h3>
                <button className="text-sm text-forest-600 hover:text-forest-800">
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-forest-200">
              {[
                { name: 'Q4 2024 Executive Summary', type: 'PDF', date: '2024-01-15', size: '2.4 MB' },
                { name: 'District Performance Analysis', type: 'Excel', date: '2024-01-12', size: '5.1 MB' },
                { name: 'Community Feedback Report', type: 'PDF', date: '2024-01-10', size: '3.2 MB' },
                { name: 'Processing Time Trends', type: 'CSV', date: '2024-01-08', size: '1.8 MB' }
              ].map((report, index) => (
                <motion.div
                  key={index}
                  className="p-4 hover:bg-forest-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-forest-600" />
                      </div>
                      <div>
                        <p className="font-medium text-forest-800">{report.name}</p>
                        <p className="text-sm text-forest-600">{report.type} • {report.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-forest-600">{report.date}</span>
                      <button className="text-forest-600 hover:text-forest-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ReportsPage