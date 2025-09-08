# 🏨 Hotel Booking System - Frontend

React frontend application for the Hotel Booking System with modern UI, AI recommendations, chatbot assistant, and analytics dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on port 5000

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Open http://localhost:3000 in your browser

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── Navbar.js        # Navigation component
│   │   ├── HotelCard.js     # Hotel display component
│   │   ├── BookingForm.js   # Booking form modal
│   │   └── Chatbot.js       # AI chatbot assistant
│   ├── context/
│   │   └── AuthContext.js   # Authentication context
│   ├── pages/
│   │   ├── Home.js          # Landing page
│   │   ├── Hotels.js        # Hotels listing page
│   │   ├── Login.js         # Login page
│   │   ├── Register.js      # Registration page
│   │   ├── Dashboard.js     # User dashboard
│   │   ├── AdminDashboard.js # Admin dashboard
│   │   └── Analytics.js     # Analytics dashboard
│   ├── utils/
│   │   └── api.js           # API utility functions
│   ├── App.js               # Main app component
│   ├── App.css              # App-specific styles
│   ├── index.js             # App entry point
│   └── index.css            # Global styles
└── package.json
```

## 🎯 Features

### 🏠 Pages
- **Home**: Welcome page with features overview
- **Hotels**: Browse and search hotels with filters
- **Login/Register**: User authentication forms
- **Dashboard**: User booking management
- **Admin Dashboard**: Hotel and booking management
- **Analytics**: Data visualization with charts

### 🧩 Components
- **Navbar**: Navigation with authentication state
- **HotelCard**: Hotel display with booking functionality
- **BookingForm**: Modal form for hotel bookings
- **Chatbot**: AI assistant for booking help

### 🤖 AI Features
- **Recommendation System**: Personalized hotel suggestions
- **Chatbot Assistant**: Natural language booking assistance
- **Smart Filters**: Location and budget-based filtering

### 📊 Analytics
- **Charts**: Bar charts, line charts, and pie charts
- **Real-time Data**: Live occupancy and booking statistics
- **Performance Metrics**: Revenue and booking trends

## 🎨 UI/UX Features

### Design System
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and intuitive interface
- **Color Scheme**: Professional blue and white theme
- **Typography**: Clear and readable fonts
- **Icons**: Emoji-based icons for visual appeal

### User Experience
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time form validation
- **Modal Dialogs**: Non-intrusive booking forms
- **Toast Notifications**: Success and error feedback

## 🔧 Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Environment Configuration
The app automatically proxies API requests to `http://localhost:5000`. For production, update the API base URL in `src/utils/api.js`.

### State Management
- **React Context**: Authentication state management
- **Local State**: Component-level state with hooks
- **Local Storage**: JWT token persistence

## 🎯 Component Details

### Navbar Component
```javascript
// Features
- Dynamic navigation based on authentication
- User role-based menu items
- Logout functionality
- Responsive design
```

### HotelCard Component
```javascript
// Features
- Hotel image display
- Price and amenities
- Booking button with availability check
- Modal booking form integration
```

### BookingForm Component
```javascript
// Features
- Date selection with validation
- Guest and room selection
- Price calculation
- Special requests input
- Form submission with loading state
```

### Chatbot Component
```javascript
// Features
- Natural language processing
- Hotel search assistance
- Booking guidance
- Responsive chat interface
- Message history
```

## 📊 Analytics Dashboard

### Charts and Visualizations
- **Bar Charts**: Hotel occupancy rates
- **Line Charts**: Seasonal booking trends
- **Pie Charts**: Revenue distribution
- **Data Tables**: Detailed statistics

### Real-time Updates
- Live occupancy tracking
- Booking status updates
- Revenue calculations
- Performance metrics

## 🎨 Styling

### CSS Architecture
- **Global Styles**: Base styles in `index.css`
- **Component Styles**: Scoped styles in `App.css`
- **Utility Classes**: Helper classes for common patterns
- **Responsive Design**: Mobile-first breakpoints

### Design Tokens
```css
/* Colors */
--primary-color: #007bff;
--secondary-color: #6c757d;
--success-color: #28a745;
--danger-color: #dc3545;
--warning-color: #ffc107;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 3rem;
```

## 🔐 Authentication Flow

### Login Process
1. User enters credentials
2. API call to backend
3. JWT token received and stored
4. User redirected to dashboard
5. Token included in subsequent requests

### Protected Routes
- Dashboard (user only)
- Admin Dashboard (admin only)
- Analytics (admin only)

### Token Management
- Stored in localStorage
- Automatically included in API requests
- Handles token expiry and refresh

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Platforms
- **Netlify**: Easy deployment with continuous integration
- **Vercel**: Optimized for React applications
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repositories

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production Considerations
- Update API base URL for production
- Enable HTTPS
- Set up proper error boundaries
- Implement service worker for offline support
- Optimize bundle size

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Hotel browsing and filtering
- [ ] Booking creation and management
- [ ] Admin dashboard functionality
- [ ] Chatbot interactions
- [ ] Analytics data display
- [ ] Responsive design on mobile
- [ ] Error handling scenarios

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check if backend is running on port 5000
   - Verify CORS settings
   - Check network connectivity

2. **Authentication Issues**
   - Clear localStorage and try again
   - Check JWT token validity
   - Verify user role permissions

3. **Styling Issues**
   - Check CSS imports
   - Verify responsive breakpoints
   - Clear browser cache

4. **Build Errors**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Verify environment variables

## 📱 Mobile Support

### Responsive Features
- Mobile-first design approach
- Touch-friendly interface
- Optimized for small screens
- Swipe gestures support
- Mobile navigation menu

### Performance Optimizations
- Lazy loading of components
- Image optimization
- Bundle size optimization
- Caching strategies

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.js`
4. Add API calls in `src/utils/api.js`
5. Update navigation in `Navbar.js`

### Theming
- Modify color variables in CSS
- Update component styles
- Customize typography
- Add new UI components

## 📚 Dependencies

### Core Dependencies
- **React**: UI library
- **React Router DOM**: Navigation
- **Axios**: HTTP client
- **Recharts**: Data visualization

### Development Dependencies
- **React Scripts**: Build tools
- **Testing Library**: Testing utilities

---

**Frontend Documentation for Hotel Booking System**
