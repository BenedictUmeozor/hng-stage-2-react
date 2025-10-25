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
│   ├── layout/         # Layout components (Header, Footer)
│   ├── decorative/     # Decorative elements (WavyBackground, DecorativeCircle)
│   └── cards/          # Card components (FeatureCard)
├── pages/              # Page components
│   └── Home/           # Landing page
├── types/              # TypeScript type definitions
├── lib/                # Utilities and router configuration
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

## UI Components

### Layout Components
- **Header**: Navigation with logo and CTA buttons
- **Footer**: Consistent footer with copyright and links

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

- Authentication pages (Login/Signup)
- Dashboard with ticket statistics
- Ticket management (CRUD operations)
- Protected routes with session management

## License

MIT
