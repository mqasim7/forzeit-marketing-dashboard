# Forzeit Marketing Dashboard

A comprehensive Vue3 marketing dashboard built using the Vuexy theme with Forzeit's branding, featuring real Excel data integration and advanced analytics.

## Features

### Live Statistics Strip
- **Active users last 5 seconds**: Real-time simulation updating every 5 seconds
- **Active users last 24 hours**: Updates every 30 seconds with percentage trends
- **Cards created last 24 hours**: Updates every 15 seconds with trend indicators

### KPI Cards (At-a-Glance)
- **Total Unique Visitors** with MoM percentage change
- **Trial Signups** with MoM trends
- **Trial Conversion Rate** vs 9% benchmark (Good/Neutral/Poor status)
- **Paid Subscriptions** with MoM growth
- **Paid Conversion Rate** vs 20% benchmark with status indicators
- **New MRR** with MoM change and 30-day run-rate
- **Current MRR** and **Current ARR** with growth trends
- **Overall Visitor→Paid Conversion** rate
- **Performance Highlights** showing best months per metric

### Core Time Series Charts
- **Unique Visitors by Month** - gradient area chart
- **Trial Signups by Month** - gradient area chart
- **Trial Conversion Rate** with 9% benchmark line
- **Paid Conversion Rate** with 20% benchmark line  
- **New MRR by Month** - gradient area chart
- **Current Total MRR** - cumulative growth chart
- **Current Total ARR** - cumulative growth chart
- **Paid Subscriptions** - bar chart visualization

### Funnel & Relationship Analysis
- **Monthly Conversion Funnel**: Visitors → Trials → Paid with rates
- **Funnel Evolution**: 6-month trends and quality score
- **Relationship Scatter Plots**:
  - Visitors vs Trials (linear relationship analysis)
  - Trials vs Paid (trial quality indicator)
  - Paid vs New MRR (ARPPU proxy analysis)
- **Outlier Detection**: Automatic highlighting of data anomalies

### Benchmark Performance
- **Trial Conversion Gauge**: Circular progress vs 9% target
- **Paid Conversion Gauge**: Circular progress vs 20% target
- **Progress Indicators**: Linear progress bars to targets
- **12-Month Sparklines**: Trend visualization for all key metrics
- **Performance Status**: Visual indicators (Good/Near Target/Below Target)

### Monthly Summary & Anomalies
- **Comprehensive Data Table**: All metrics with conditional formatting
- **Anomaly Detection**: Automatic identification of significant spikes/drops (>25% change)
- **Benchmark Indicators**: Visual status for conversion rates vs targets
- **MoM Change Tracking**: Month-over-month percentage changes
- **Best/Worst Month Tagging**: Performance highlights per metric

## Excel Data Integration

All data is sourced from the provided Excel sheet with exact figures:

### Monthly Metrics (Jan-Dec)
- Unique Visitors (148 → 1,175)
- Trial Signups (1 → 89)
- Trial Conversion Rate (0.68% → 7.60%)
- Paid Subscriptions (1 → 18.8)
- Paid Conversion Rate (100% → 21%)
- New MRR (£14 → £356)
- Current MRR (£116 → £1,253)
- Current ARR (£1,392 → £15,036)

### Benchmarks
- Trial Conversion Rate: 9% target
- Paid Conversion Rate: 20% target

## Design System

### Forzeit Brand Colors
- **Primary**: #B53C17 (warm red/orange)
- **Success**: #00d084 (green)
- **Info**: #44FFD2 (bright cyan)
- **Secondary**: #8D99AE (blue-gray)
- **Warning**: #ffb547 (orange)
- **Error**: #ff4757 (red)

### Typography
- **Font Family**: DM Sans (Google Fonts)
- **Hierarchy**: Consistent font weights and sizes
- **Accessibility**: High contrast ratios

### Component Design
- **Cards**: Elevated with subtle shadows
- **Chips**: Tonal variants for status indicators
- **Charts**: Gradient fills using brand colors
- **Tables**: Conditional formatting for anomalies

## Installation & Setup

```bash
# Clone and navigate to project
cd forzeit-dashboard

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## Technical Implementation

### Architecture
- **Vue 3 Composition API** for reactive state management
- **TypeScript** with strict type checking
- **Vuetify 3** components for consistent UI
- **Modular Components** for maintainability
- **Utility Functions** for data calculations

### Performance Optimizations
- **Lightweight Charts**: Vuetify sparklines instead of heavy libraries
- **Computed Properties**: Efficient reactive calculations
- **Component Lazy Loading**: Optimized bundle splitting
- **Memory Management**: Proper cleanup of intervals

### Project Structure

```
src/
├── components/
│   ├── LiveStatsStrip.vue        # Live 5s/24h user & card metrics
│   ├── KPICards.vue              # Comprehensive KPI overview
│   ├── TimeSeriesCharts.vue      # Monthly trend visualizations
│   ├── BenchmarkGauges.vue       # Conversion rate vs targets
│   ├── FunnelAnalytics.vue       # Conversion funnel & relationships
│   └── SummaryTable.vue          # Monthly data table & anomalies
├── data/
│   └── marketingData.ts          # Excel data & utility functions
├── pages/
│   └── index.vue                 # Main dashboard page
└── navigation/
    └── vertical/index.ts         # Simplified navigation
```

## Key Insights Available

### Growth Metrics
- **Visitor Growth**: 694% increase (148 → 1,175)
- **Trial Conversion**: Improvement from 0.68% to 7.60%
- **Revenue Growth**: ARR expansion from £1,392 to £15,036
- **Conversion Quality**: Paid rate reaching 21% (above 20% target)

### Performance Analysis
- **Benchmark Achievement**: Trial conversion below 9% target (opportunity)
- **Strong Paid Conversion**: Exceeding 20% target consistently
- **Revenue Acceleration**: Strong MRR growth trajectory
- **Anomaly Detection**: Automatic identification of significant changes

### Business Intelligence
- **Funnel Optimization**: Clear drop-off points identification
- **Seasonal Patterns**: Monthly performance variations
- **Quality Metrics**: ARPPU and customer value analysis
- **Growth Forecasting**: Trend-based projections

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Requirements

- Node.js 16+
- npm 8+
- Modern browser with ES2020 support

## License

This project uses the Vuexy theme license. Ensure compliance for commercial use.
