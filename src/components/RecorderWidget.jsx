import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Play, Pause, Send, Trash2, Volume2 } from 'lucide-react'

const RecorderWidget = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    setHasRecording(false)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setHasRecording(true)
  }

  const playRecording = () => {
    setIsPlaying(true)
    // Simulate playback
    setTimeout(() => {
      setIsPlaying(false)
    }, recordingTime * 1000)
  }

  const deleteRecording = () => {
    setHasRecording(false)
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const submitRecording = () => {
    setShowSuccess(true)
    setHasRecording(false)
    setRecordingTime(0)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
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
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-800 font-medium">
                Voice note submitted successfully!
              </p>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Your feedback has been recorded and will be analyzed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording Interface */}
      <div className="bg-forest-50 rounded-lg p-4 border border-forest-200">
        {/* Microphone Visual */}
        <div className="flex justify-center mb-4">
          <motion.div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isRecording ? 'bg-red-500' : hasRecording ? 'bg-green-500' : 'bg-forest-500'
            } shadow-lg`}
            animate={{
              scale: isRecording ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isRecording ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <Mic className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Waveform Animation */}
        {isRecording && (
          <motion.div
            className="flex justify-center items-end space-x-1 mb-4 h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-500 rounded-full wave-bar"
                style={{
                  height: Math.random() * 24 + 8,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Timer */}
        <div className="text-center mb-4">
          <p className={`text-2xl font-mono font-bold ${
            isRecording ? 'text-red-600' : 'text-forest-800'
          }`}>
            {formatTime(recordingTime)}
          </p>
          <p className="text-xs text-forest-600">
            {isRecording ? 'Recording in progress...' : 
             hasRecording ? 'Ready to submit' : 'Tap to start recording'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-3">
          {!hasRecording ? (
            <motion.button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-4 rounded-full shadow-lg transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-forest-500 hover:bg-forest-600 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </motion.button>
          ) : (
            <>
              {/* Play Button */}
              <motion.button
                onClick={playRecording}
                disabled={isPlaying}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>

              {/* Delete Button */}
              <motion.button
                onClick={deleteRecording}
                className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>

              {/* Submit Button */}
              <motion.button
                onClick={submitRecording}
                className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Recent Recordings */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-forest-800">Recent Voice Notes</h4>
        <div className="space-y-2">
          {[
            { id: 1, duration: '2:34', status: 'Analyzed', sentiment: 'positive' },
            { id: 2, duration: '1:45', status: 'Processing', sentiment: 'neutral' },
            { id: 3, duration: '3:12', status: 'Analyzed', sentiment: 'negative' },
          ].map((note) => (
            <motion.div
              key={note.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-forest-200"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  note.sentiment === 'positive' ? 'bg-green-500' :
                  note.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-forest-800">{note.duration}</p>
                  <p className="text-xs text-forest-600">{note.status}</p>
                </div>
              </div>
              <button className="p-1 text-forest-600 hover:text-forest-800">
                <Play className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecorderWidget