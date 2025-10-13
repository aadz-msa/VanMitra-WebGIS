import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeaderBar from './components/HeaderBar'
import MapPage from './pages/MapPage'
import InsightsPage from './pages/InsightsPage'
import CommunityPage from './pages/CommunityPage'
import ReportsPage from './pages/ReportsPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-earth-50">
        <HeaderBar />
        <motion.main 
          className="pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  )
}

export default App