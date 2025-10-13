import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, ChevronDown, Upload, Mic, Users, X, Play, Square, Send } from 'lucide-react'
import LayerToggleGroup from './LayerToggleGroup'
import RecorderWidget from './RecorderWidget'
import UploadDrawer from './UploadDrawer'

const FilterSidebar = ({ 
  isOpen, 
  onToggle, 
  visibleLayers, 
  onLayerToggle, 
  filters, 
  onFilterChange,
  onApplyFilters 
}) => {
  const [activeTab, setActiveTab] = useState('filters')
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const districts = ['All', 'Wayanad', 'Idukki', 'Palakkad', 'Thrissur']
  const villages = ['All', 'Meppadi', 'Sulthan Bathery', 'Munnar', 'Thekkady', 'Attappady']
  const claimTypes = ['All', 'Filed', 'Approved', 'Pending', 'Rejected']
  const years = ['All', '2019', '2020', '2021', '2022', '2023', '2024']

  const tabs = [
    { id: 'filters', label: 'Filters', icon: Filter },
    { id: 'layers', label: 'Layers', icon: Filter },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'voice', label: 'Voice', icon: Mic }
  ]

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>
      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-xl border-r border-forest-200 z-50 overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-full transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-forest-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-forest-800">Control Panel</h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-forest-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-forest-600" />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex space-x-1 bg-forest-50 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-forest-800 shadow-sm'
                      : 'text-forest-600 hover:text-forest-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <AnimatePresence mode="wait">
            {/* Filters Tab */}
            {activeTab === 'filters' && (
              <motion.div
                key="filters"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                  {/* District Filter */}
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-2">
                      District
                    </label>
                    <div className="relative">
                      <select
                        value={filters.district}
                        onChange={(e) => onFilterChange('district', e.target.value)}
                        className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 appearance-none cursor-pointer hover:bg-forest-50 transition-colors"
                      >
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-600 pointer-events-none" />
                    </div>
                  </div>

                  {/* Village Filter */}
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-2">
                      Village
                    </label>
                    <div className="relative">
                      <select
                        value={filters.village}
                        onChange={(e) => onFilterChange('village', e.target.value)}
                        className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 appearance-none cursor-pointer hover:bg-forest-50 transition-colors"
                      >
                        {villages.map((village) => (
                          <option key={village} value={village}>
                            {village}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-600 pointer-events-none" />
                    </div>
                  </div>

                  {/* Claim Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-2">
                      Claim Type
                    </label>
                    <div className="relative">
                      <select
                        value={filters.claimType}
                        onChange={(e) => onFilterChange('claimType', e.target.value)}
                        className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 appearance-none cursor-pointer hover:bg-forest-50 transition-colors"
                      >
                        {claimTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-600 pointer-events-none" />
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-2">
                      Year
                    </label>
                    <div className="relative">
                      <select
                        value={filters.year}
                        onChange={(e) => onFilterChange('year', e.target.value)}
                        className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 appearance-none cursor-pointer hover:bg-forest-50 transition-colors"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-600 pointer-events-none" />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-forest-800 mb-2">
                      Description
                    </label>
                    <textarea
                      value={filters.description}
                      onChange={(e) => onFilterChange('description', e.target.value)}
                      className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 resize-none min-h-[60px]"
                      placeholder="Brief description of your claim..."
                    />
                  </div>
                </motion.div>
            )}

            {/* Layers Tab */}
            {activeTab === 'layers' && (
              <motion.div
                key="layers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <LayerToggleGroup
                  visibleLayers={visibleLayers}
                  onLayerToggle={onLayerToggle}
                />
              </motion.div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold text-forest-800 mb-3">Document Upload</h3>
                <UploadDrawer isInline={true} />
              </motion.div>
            )}

            {/* Voice Tab */}
            {activeTab === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold text-forest-800 mb-3">Community Voice</h3>
                <RecorderWidget />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar