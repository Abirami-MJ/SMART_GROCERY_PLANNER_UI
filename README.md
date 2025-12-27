# Smart Grocery Planner

**Visualize freshness. Reduce waste. Eat smarter.**

A visual-first, elder-friendly grocery planning application that predicts waste risk and simplifies food decisions through real-time expiry tracking and smart alerts.

## Features

### Core Functionality
- **Real-time Expiry Tracking**: Watch your groceries' freshness decay with animated progress bars
- **Smart Alerts**: Get notified when items reach 50% (warning) and 20% (critical) of their expiry time
- **Visual-First Design**: Color-coded progress bars with flashing animations for critical items
- **Time Simulation**: 1 day = 10 seconds for demo purposes to visualize expiry decay

### Elder-Friendly Accessibility
- **Elder Mode**: Large fonts, high contrast colors, simplified interface
- **Voice Alerts**: Spoken notifications for all important information
- **WCAG Compliant**: Full keyboard navigation and screen reader support
- **Color-Independent Cues**: Icons and animations convey urgency beyond just color

### Smart Features
- **Food Health Score**: Overall freshness rating of your grocery inventory
- **Consume Today**: Auto-suggest items expiring soon with meal recommendations
- **Waste Analytics**: Track your progress in reducing food waste and saving money
- **Category Management**: Organize groceries by type with smart defaults

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: CSS Custom Properties with utility classes
- **Icons**: Lucide React
- **State Management**: React Context API with useReducer
- **Persistence**: localStorage for data persistence
- **Accessibility**: WCAG 2.1 AA compliant

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-grocery-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Usage Guide

### Adding Groceries
1. Navigate to "Add Grocery" 
2. Enter item name, select category, set expiry days, and quantity
3. Use quick-add suggestions for common items
4. Items are immediately tracked with real-time expiry countdown

### Monitoring Expiry
1. Visit "Live Expiry Tracker" to see all items with animated progress bars
2. Filter by status: Safe (green), Warning (yellow), Critical (red), Expired (gray)
3. Sort by expiry time, name, or category
4. Critical items flash red and trigger alerts

### Smart Alerts
1. "Smart Alerts" page shows all items needing attention
2. Enable voice alerts for spoken notifications
3. Configure sound effects for different alert types
4. Get automatic notifications when items reach warning/critical thresholds

### Elder Mode
1. Activate in Settings or Elder Mode page
2. Enables larger text, high contrast, and voice features
3. Simplified interface optimized for accessibility
4. Voice alerts read important information aloud

## Design Principles

1. **Time should be felt, not calculated** - Visual progress bars show decay over time
2. **Color and motion convey urgency** - Flashing red for critical items, smooth animations
3. **One screen, one decision** - Each page focuses on a single task
4. **Accessibility is mandatory** - WCAG compliant with elder-friendly features

## Project Structure

```
src/
├── components/
│   ├── Layout/          # Navigation, Header, Layout components
│   ├── UI/              # Reusable UI components (Button, Card, etc.)
│   └── Grocery/         # Grocery-specific components
├── context/             # React Context for state management
├── pages/               # Route components
├── App.jsx              # Main app component
└── main.jsx            # Entry point
```

## Key Components

- **GroceryContext**: Manages grocery state, expiry calculations, and time simulation
- **SettingsContext**: Handles accessibility settings and voice features
- **GroceryItem**: Displays individual grocery with progress bar and actions
- **ProgressBar**: Animated progress bar with status-based colors
- **Navigation**: Responsive navigation with alert badges

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Voice Alerts**: Text-to-speech for important notifications
- **High Contrast**: Enhanced color contrast in elder mode
- **Reduced Motion**: Respects user's motion preferences
- **Large Text**: Scalable font sizes for better readability

## Time Simulation

For demonstration purposes, the app uses accelerated time:
- **1 real day = 10 seconds** in the app
- This allows you to see expiry progress in real-time
- Progress bars update every second
- Items automatically move through safe → warning → critical → expired states

## Contributing

1. Follow the existing code style and patterns
2. Ensure all new features are accessible
3. Test with elder mode enabled
4. Add appropriate ARIA labels and keyboard support
5. Update documentation for new features

## License

This project is licensed under the MIT License.

## Support

For accessibility questions or elder-friendly feature requests, please open an issue with detailed requirements.