# TicketFlow - React Implementation

A modern ticket management application built with React, TypeScript, and Tailwind CSS.

## Technologies Used

- **React** 19.1.1 - UI library
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.1.7 - Build tool
- **Tailwind CSS** 4.1.16 - Styling
- **React Router** 7.9.4 - Routing
- **Lucide React** 0.548.0 - Icons

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── layout/         # Layout components (Header, Footer, AuthLayout)
│   ├── decorative/     # Decorative elements (WavyBackground, DecorativeCircle)
│   ├── cards/          # Card components (FeatureCard)
│   ├── forms/          # Form components (Input, Button)
│   └── routing/        # Route components (ProtectedRoute)
├── contexts/           # React contexts (AuthContext, ToastContext)
├── hooks/              # Custom hooks (useAuth, useToast, useForm)
├── pages/              # Page components
│   ├── Home/           # Landing page
│   └── Auth/           # Auth pages (Login, Signup)
├── lib/                # Utilities
│   ├── auth.ts         # Session management
│   ├── mockAuth.ts     # Mock authentication service
│   ├── validation.ts   # Form validation functions
│   └── router.ts       # Router configuration
├── types/              # TypeScript type definitions
└── App.tsx             # Root component
```

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Features Implemented

### Landing Page
- ✅ Hero section with wavy SVG background
- ✅ Decorative circles for visual interest
- ✅ Responsive feature cards grid
- ✅ CTA buttons (Login, Get Started)
- ✅ Max-width 1440px centered layout
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Semantic HTML and accessibility compliance

### Authentication Screen
- ✅ Login page with email/password form
- ✅ Signup page with name/email/password/confirm password
- ✅ Real-time form validation with inline errors
- ✅ Toast notifications for success/error states
- ✅ Session management with localStorage
- ✅ Protected routes for authenticated users
- ✅ Conditional header (Logout when authenticated)

#### Test Credentials
- **Email:** test@example.com
- **Password:** password123

Additional test accounts:
- demo@ticketflow.com / demo123
- admin@ticketflow.com / admin123

#### Authentication System
- **State Management:** AuthContext with useReducer pattern
- **Persistence:** localStorage (key: `ticketapp_session`)
- **Mock Service:** Simulates API with 800ms delay
- **Toast Notifications:** Global ToastContext with 4-second auto-dismiss

#### Auth Components
- **Forms:** `Input`, `Button` - Reusable form components with error states
- **Layout:** `AuthLayout` - Consistent wrapper with Header/Footer
- **Routing:** `ProtectedRoute` - Redirects unauthenticated users to login

#### Auth Pages
- **Login:** `/auth/login` - Email/password authentication
- **Signup:** `/auth/signup` - New user registration with validation
- **Dashboard:** `/dashboard` - Protected placeholder page (coming soon)

#### Custom Hooks
- **useAuth:** Access authentication context (login, signup, logout, user state)
- **useToast:** Display toast notifications (success, error, info, warning)
- **useForm:** Generic form state management with validation

#### Form Validation
- Real-time validation with error display on blur
- Email format validation (regex)
- Password minimum length (6 characters)
- Name minimum length (2 characters)
- Confirm password match validation
- Inline error messages beneath each field

## UI Components

### Layout Components
- **Header**: Navigation with logo, conditional auth buttons (Login/Signup or Logout)
- **Footer**: Consistent footer with copyright and links
- **AuthLayout**: Wrapper for authentication pages with centered form container

### Form Components
- **Input**: Text/email/password input with label, error display, accessibility
- **Button**: Primary/secondary variants with loading state

### Routing Components
- **ProtectedRoute**: Guards authenticated routes, redirects to /auth/login

### Decorative Components
- **WavyBackground**: SVG wave pattern for hero section
- **DecorativeCircle**: Customizable circular decorative element

### Content Components
- **FeatureCard**: Card component for displaying features

## Accessibility

- Semantic HTML elements (header, nav, main, footer, section)
- ARIA attributes for decorative elements (aria-hidden)
- Keyboard navigation support
- Sufficient color contrast ratios
- Responsive text sizing
- Focus states for interactive elements

## Responsive Breakpoints

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns, max-width 1440px)

## Known Issues

None at this time.

## Future Features

- ~~Authentication pages (Login/Signup)~~ ✅ Completed
- ~~Protected routes with session management~~ ✅ Completed
- Dashboard with ticket statistics (In Progress)
- Ticket management (CRUD operations)
- Ticket assignment and status updates
- User profile management

## License

MIT
