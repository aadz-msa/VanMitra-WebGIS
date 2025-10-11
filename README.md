# 🌿 VanMitra - Tribal Land Rights Management WebGIS Platform

VanMitra is a comprehensive, AI-powered WebGIS platform designed to support tribal land rights management under the Forest Rights Act (FRA). Built with modern web technologies, it provides an interactive mapping interface, AI-driven insights, community voice analysis, and comprehensive reporting capabilities.

## ✨ Features

### 🗺️ Interactive WebGIS
- **Multi-layer Mapping**: Toggle between forest cover, water bodies, farm lands, FRA claims, and biodiversity zones
- **Real-time Visualization**: Interactive markers showing claim status (approved, pending, rejected)
- **Village Information Panels**: Detailed village statistics and claim breakdowns
- **Responsive Map Interface**: Optimized for desktop, tablet, and mobile devices

### 🤖 AI-Powered Insights
- **Approval Probability Prediction**: ML models predict claim approval likelihood
- **Processing Time Estimation**: AI-driven processing time forecasts
- **Anomaly Detection**: Automated alerts for documentation gaps and processing delays
- **Risk Assessment**: Deforestation risk and biodiversity impact analysis

### 🗣️ Community Voice Platform
- **Voice Note Recording**: Direct community feedback recording capability
- **Sentiment Analysis**: NLP-powered sentiment classification (positive, neutral, negative)
- **Topic Modeling**: Automatic identification of major discussion themes
- **Multi-language Support**: Malayalam, Tamil, Kannada, and Hindi support

### 📊 Comprehensive Reporting
- **Executive Summaries**: High-level FRA implementation progress reports
- **Detailed Analytics**: Village-level performance breakdowns
- **Trend Analysis**: Historical data analysis and forecasting
- **Export Capabilities**: PDF, Excel, and CSV export options

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with Vite
- **Mapping Library**: Leaflet.js with React-Leaflet
- **Styling**: Tailwind CSS with custom forest theme
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **Routing**: React Router v7+
- **Icons**: Lucide React

## 🎨 Design System

### Forest-Inspired Theme
- **Primary Colors**: Forest greens (#369936, #22C55E) and earth tones (#b89c7f)
- **Typography**: Inter font family for modern, clean readability
- **Visual Elements**: Soft shadows, rounded corners, and nature-inspired color palette
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 📁 Project Structure

```
vanmitra-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── HeaderBar.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── MapContainer.jsx
│   │   ├── InfoPanel.jsx
│   │   ├── StatCard.jsx
│   │   ├── ChartWidget.jsx
│   │   ├── RecorderWidget.jsx
│   │   ├── UploadDrawer.jsx
│   │   ├── AIInsightCard.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   └── LayerToggleGroup.jsx
│   │
│   ├── pages/               # Main application pages
│   │   ├── MapPage.jsx      # Interactive dashboard with map
│   │   ├── InsightsPage.jsx # AI insights and predictions
│   │   ├── CommunityPage.jsx # Community voice analysis
│   │   └── ReportsPage.jsx  # Reports and analytics
│   │
│   ├── data/                # Dummy data for simulation
│   │   ├── mapData.json
│   │   ├── dashboardData.json
│   │   ├── aiInsights.json
│   │   └── communityData.json
│   │
│   └── styles/
│       └── globals.css      # Global styles and Tailwind setup
│
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vanmitra-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### MapContainer
Interactive Leaflet map with multiple data layers and village markers. Supports layer toggling and detailed information panels.

### FilterSidebar
Collapsible sidebar with filtering controls, layer toggles, document upload, and voice recording capabilities.

### AIInsightCard
Displays AI-generated predictions, anomaly alerts, and risk assessments with confidence indicators and recommendations.

### RecorderWidget
Voice recording interface with waveform visualization, playback controls, and submission functionality.

### ChartWidget
Flexible chart component supporting bar, line, area, pie, and donut charts using Recharts library.

## 📊 Data Structure

The application uses JSON files to simulate backend data:

- **mapData.json**: Village coordinates, FRA status, and map layer definitions
- **dashboardData.json**: Statistical overviews, trends, and district-wise data
- **aiInsights.json**: ML predictions, anomaly alerts, and risk assessments
- **communityData.json**: Voice notes, sentiment analysis, and community engagement metrics

## 🎨 Customization

### Theme Colors
The application uses a custom forest-inspired color palette defined in `tailwind.config.js`:

```javascript
colors: {
  forest: {
    50: '#f0f9f0',
    500: '#369936',
    800: '#1c411c',
  },
  earth: {
    50: '#faf9f7',
    500: '#b89c7f',
    800: '#5f4d38',
  }
}
```

### Adding New Features
1. Create new components in `src/components/`
2. Add routing in `App.jsx`
3. Update dummy data in `src/data/`
4. Implement responsive design with Tailwind classes

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real APIs and databases
- **User Authentication**: Implement role-based access control
- **Real-time Updates**: WebSocket integration for live data
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: More sophisticated ML models
- **Multi-tenant Support**: District-wise data isolation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Forest Rights Act (2006) implementation guidelines
- Tribal communities for their valuable feedback and participation
- Open source community for the amazing tools and libraries

---

**VanMitra** - Empowering tribal communities through technology 🌿✨