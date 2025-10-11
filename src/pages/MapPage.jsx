import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, FileText, Users, Clock, TrendingUp } from 'lucide-react'
import MapContainer from '../components/MapContainer'
import FilterSidebar from '../components/FilterSidebar'
import StatCard from '../components/StatCard'
import ChartWidget from '../components/ChartWidget'
import dashboardData from '../data/dashboardData.json'

const MapPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedVillage, setSelectedVillage] = useState(null)
  const [visibleLayers, setVisibleLayers] = useState({
    forestCover: true,
    waterBodies: true,
    farmLands: false,
    fraClaims: true,
    biodiversity: false
  })
  const [filters, setFilters] = useState({
    district: 'All',
    village: 'All',
    claimType: 'All',
    year: 'All'
  })

  const handleLayerToggle = (layerKey) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }))
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleApplyFilters = () => {
    // In a real app, this would trigger data refetch
    console.log('Applying filters:', filters)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const statsData = [
    {
      title: 'Total Claims Filed',
      value: dashboardData.overview.totalClaims,
      subValue: 'All districts',
      icon: FileText,
      trend: 'up',
      trendValue: '+12%',
      color: 'forest'
    },
    {
      title: 'Approved Claims',
      value: dashboardData.overview.approvedClaims,
      subValue: `${((dashboardData.overview.approvedClaims / dashboardData.overview.totalClaims) * 100).toFixed(1)}% approval rate`,
      icon: Users,
      trend: 'up',
      trendValue: '+8%',
      color: 'green'
    },
    {
      title: 'Pending Claims',
      value: dashboardData.overview.pendingClaims,
      subValue: 'Under review',
      icon: Clock,
      trend: 'down',
      trendValue: '-5%',
      color: 'yellow'
    },
    {
      title: 'Processing Time',
      value: dashboardData.overview.averageProcessingTime,
      subValue: 'Average duration',
      icon: TrendingUp,
      trend: 'down',
      trendValue: '-2.1 months',
      color: 'earth'
    }
  ]

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <FilterSidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        visibleLayers={visibleLayers}
        onLayerToggle={handleLayerToggle}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-forest-200 p-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center space-x-2 text-forest-600 hover:text-forest-800"
          >
            <Menu className="w-5 h-5" />
            <span className="font-medium">Control Panel</span>
          </button>
        </div>

        {/* Map Section */}
        <div className="flex-1 relative bg-forest-50">
          <MapContainer
            visibleLayers={visibleLayers}
            selectedVillage={selectedVillage}
            onVillageSelect={setSelectedVillage}
          />
        </div>

        {/* Dashboard Section */}
        <div className="bg-white border-t border-forest-200 p-4 overflow-y-auto max-h-80">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-forest-800 mb-6">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statsData.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  {...stat}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Claims by Year */}
              <ChartWidget
                title="Claims Filed by Year"
                type="bar"
                data={dashboardData.claimsByYear}
                dataKey="filed"
                xAxisKey="year"
                colors={['#369936']}
                height={250}
              />

              {/* Claim Type Distribution */}
              <ChartWidget
                title="Claim Type Distribution"
                type="donut"
                data={dashboardData.claimTypeDistribution.map(item => ({
                  name: item.type,
                  value: item.count,
                  percentage: item.percentage
                }))}
                dataKey="value"
                colors={['#369936', '#22C55E', '#EAB308']}
                height={250}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MapPage