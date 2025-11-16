# VMSS Technologies Website

A modern, responsive single-page website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- 🚀 Smooth scroll navigation
- 🧩 Component-based architecture
- ⚡ Fast development with Vite
- 🎯 Single-page application (no routing)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with smooth scroll
│   ├── Hero.jsx            # Hero section with CTA buttons
│   ├── ExploreServices.jsx # Services grid with cards
│   ├── Instructors.jsx     # Instructor profiles
│   ├── WhyChooseUs.jsx     # Features and benefits
│   ├── TrustedBy.jsx       # Company logos and stats
│   ├── ContactUs.jsx       # Contact form and information
│   └── Footer.jsx          # Footer with links and social media
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles with Tailwind

```

## Components

- **Header**: Sticky navigation with smooth scroll to sections
- **Hero**: Full-screen hero section with background image
- **ExploreServices**: Grid of service cards with hover effects
- **Instructors**: Instructor profile cards with images and details
- **WhyChooseUs**: Feature highlights and benefits
- **TrustedBy**: Company logos and key metrics
- **ContactUs**: Contact form with validation
- **Footer**: Footer with links and social media icons

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Unsplash (for dummy images)

## Notes

- All images are from Unsplash (dummy images)
- Smooth scroll navigation is implemented for all header links
- The website is fully responsive and works on all device sizes
- Form validation is included in the Contact Us component

