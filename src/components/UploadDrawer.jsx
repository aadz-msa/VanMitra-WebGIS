import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Image, X, Check, AlertCircle } from 'lucide-react'

const UploadDrawer = ({ isInline = false }) => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    claimType: 'individual',
    description: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles.slice(0, 5 - prev.length)])
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selectedFiles.slice(0, 5 - prev.length)])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setFiles([])
    setFormData({
      name: '',
      village: '',
      claimType: 'individual',
      description: ''
    })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />
    }
    return <FileText className="w-4 h-4" />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border border-green-200 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800 font-medium">
                Documents uploaded successfully!
              </p>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Your claim has been submitted for review.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-forest-800 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-800 mb-2">
              Village *
            </label>
            <select
              value={formData.village}
              onChange={(e) => handleInputChange('village', e.target.value)}
              className="w-full p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              required
            >
              <option value="">Select Village</option>
              <option value="meppadi">Meppadi</option>
              <option value="sulthan-bathery">Sulthan Bathery</option>
              <option value="munnar">Munnar</option>
              <option value="thekkady">Thekkady</option>
              <option value="attappady">Attappady</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-800 mb-2">
              Claim Type *
            </label>
            <select
              value={formData.claimType}
              onChange={(e) => handleInputChange('claimType', e.target.value)}
              className="w-full p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              required
            >
              <option value="individual">Individual Forest Rights</option>
              <option value="community">Community Forest Rights</option>
              <option value="community-resource">Community Forest Resource</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-800 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
              rows="3"
              placeholder="Brief description of your claim..."
            />
          </div>
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-forest-800 mb-2">
            Supporting Documents
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-forest-500 bg-forest-50'
                : 'border-forest-300 hover:border-forest-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <Upload className="w-8 h-8 text-forest-500 mx-auto mb-2" />
            <p className="text-sm text-forest-600 mb-1">
              Drop files here or <span className="text-forest-700 font-medium">browse</span>
            </p>
            <p className="text-xs text-forest-400">
              PDF, JPG, PNG, DOC (Max 5 files, 10MB each)
            </p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-forest-800">
              Uploaded Files ({files.length}/5)
            </p>
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-forest-50 rounded-lg border border-forest-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-forest-600">
                    {getFileIcon(file)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-800 truncate max-w-48">
                      {file.name}
                    </p>
                    <p className="text-xs text-forest-600">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Required Documents:</p>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• Aadhaar Card or Identity Proof</li>
                <li>• Land Survey Documents</li>
                <li>• Community Verification Certificate</li>
                <li>• Photographs of Land/Property</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!formData.name || !formData.village || files.length === 0}
          className="w-full bg-forest-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Claim Application
        </motion.button>
      </form>
    </div>
  )
}

export default UploadDrawer