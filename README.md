# Link-in-Bio Generator

A modern, scalable Next.js application for creating beautiful link-in-bio pages with custom themes and styling.

## Features

- 🎨 Custom themes and color schemes
- 📱 Mobile-responsive design
- 🔄 Live preview functionality
- 📝 Form validation with Zod
- 🎯 TypeScript support
- 🎨 Tailwind CSS styling
- 🧩 Modular component architecture

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Validation**: Zod
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   ├── builder/
│   │   └── page.tsx             # Link builder page
│   └── success/
│       └── page.tsx             # Success/confirmation page
│
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   ├── form/                    # Form-related components
│   ├── preview/                 # Preview components
│   ├── theme/                   # Theme-related components
│   └── common/                  # Common/shared components
│
├── lib/                         # Utility functions and configurations
│   ├── utils.ts                 # General utility functions
│   ├── validations.ts           # Form validation schemas
│   ├── themes/                  # Theme-related utilities
│   ├── links/                   # Link-related utilities
│   └── constants.ts             # App-wide constants
│
├── types/                       # TypeScript type definitions
├── styles/                      # Additional styling
└── hooks/                       # Custom React hooks
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License 