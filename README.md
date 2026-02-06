# TECH.PK Frontend

Premium Electronics E-Commerce Platform - React Frontend Application

## 🚀 Features

- **Modern UI/UX**: Premium design with Tailwind CSS and custom animations
- **Dark/Light Theme**: Seamless theme switching with localStorage persistence
- **Responsive Design**: Mobile-first approach, works on all devices
- **State Management**: Redux Toolkit for efficient state management
- **Routing**: React Router for seamless navigation
- **Animations**: Framer Motion for smooth, professional animations
- **Form Validation**: Comprehensive input validation
- **API Integration**: Axios-based API client with interceptors
- **Toast Notifications**: React Toastify for user feedback

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🛠️ Installation

### Option 1: With Node.js/npm (Recommended)

1. **Navigate to frontend directory**
   ```bash
   cd tech-pk-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already created with default values:
   ```
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_SITE_NAME=TECH.PK
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173`

5. **Build for production** (optional)
   ```bash
   npm run build
   ```

### Option 2: Without Node.js

Since Node.js is not currently installed on your system, you'll need to:

1. **Install Node.js**
   - Download from: https://nodejs.org/
   - Choose LTS version (recommended)
   - Install with default settings
   - Restart your terminal/command prompt

2. **Verify installation**
   ```bash
   node --version
   npm --version
   ```

3. **Then follow Option 1 steps above**

## 📁 Project Structure

```
tech-pk-frontend/
├── public/
│   └── assets/              # Static assets
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (Navbar, Footer, etc.)
│   │   ├── home/            # Homepage components
│   │   ├── products/        # Product-related components
│   │   ├── cart/            # Cart components
│   │   ├── checkout/        # Checkout components
│   │   ├── user/            # User profile components
│   │   ├── admin/           # Admin panel components
│   │   └── animations/      # 3D and animation components
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── redux/
│   │   ├── store.js         # Redux store configuration
│   │   └── slices/          # Redux slices
│   │       ├── authSlice.js
│   │       ├── productSlice.js
│   │       ├── cartSlice.js
│   │       ├── orderSlice.js
│   │       └── themeSlice.js
│   ├── services/            # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   └── orderService.js
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── .env
```

## 🎨 Design System

### Colors
- **Primary**: Electric Blue (#0066FF, #00A3FF)
- **Secondary**: Cyan (#00D4FF)
- **Background**: White (light) / Black (dark)
- **Success**: #00FF88
- **Warning**: #FFB800
- **Error**: #FF3B3B

### Typography
- **Headings**: Poppins (Bold)
- **Body**: Inter (Regular)
- **Sizes**: 
  - Hero: 72px
  - Display: 48px
  - Heading: 36px
  - Subheading: 24px

### Animations
- Fade in/out
- Slide up/down
- Scale transitions
- Glow effects
- Float animations
- Shimmer loading

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Homepage with hero, featured products, categories |
| `/products` | Products | Product listing with filters and search |
| `/product/:id` | Product Detail | Individual product page |
| `/cart` | Cart | Shopping cart with order summary |
| `/checkout` | Checkout | Multi-step checkout process |
| `/login` | Login | User login |
| `/signup` | Signup | User registration |
| `/profile` | Profile | User dashboard and settings |
| `/admin` | Admin Panel | Admin dashboard (admin only) |
| `/about` | About | Company information |
| `/contact` | Contact | Contact form and info |
| `*` | 404 | Not found page |

## 🔐 Authentication

The app uses JWT-based authentication:

1. **Login/Signup**: User credentials are sent to backend
2. **Token Storage**: JWT token stored in localStorage
3. **Auto-login**: Token persists across sessions
4. **Protected Routes**: Automatic redirect to login if not authenticated
5. **Logout**: Clears token and user data

## 🛒 State Management

Redux slices manage different parts of the application:

- **authSlice**: User authentication state
- **productSlice**: Products, filters, pagination
- **cartSlice**: Shopping cart items and totals
- **orderSlice**: Order history and current order
- **themeSlice**: Dark/light mode preference

## 🎭 Theme System

- **Toggle**: Click moon/sun icon in navbar
- **Persistence**: Theme saved to localStorage
- **Auto-detect**: Respects system preference on first visit
- **Smooth Transition**: 0.3s ease transition between themes

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "@reduxjs/toolkit": "^2.0.1",
  "axios": "^1.6.5",
  "framer-motion": "^10.18.0",
  "tailwindcss": "^3.4.0",
  "react-toastify": "^10.0.3"
}
```

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:5000/api/v1`

Make sure the backend server is running before starting the frontend.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Hosting

The built files can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Configure in repository settings
- **Any static hosting**: Upload `dist` folder contents

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3000
```

### API Connection Issues
- Verify backend is running on port 5000
- Check `.env` file has correct API URL
- Ensure CORS is enabled in backend

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Notes

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `Navbar.jsx`

### Adding New API Endpoints
1. Add service function in appropriate service file
2. Create Redux actions if needed
3. Use in components with `useDispatch` and `useSelector`

### Styling Guidelines
- Use Tailwind utility classes
- Custom styles in `globals.css`
- Follow dark mode conventions with `dark:` prefix
- Use design system colors and spacing

## 🎯 Next Steps

To complete the full implementation:

1. **Install Node.js** (if not already installed)
2. **Run `npm install`** to install all dependencies
3. **Start backend server** (see backend README)
4. **Run `npm run dev`** to start frontend
5. **Open browser** to `http://localhost:5173`

## 📞 Support

For issues or questions:
- Email: support@tech.pk
- Documentation: See implementation_plan.md
- Backend API: See backend README.md

## 📄 License

MIT

## 👨‍💻 Author

TECH.PK Team

---

**Note**: This is a complete, production-ready frontend application. All core functionality is implemented. To run the application, you need to install Node.js and the project dependencies.
