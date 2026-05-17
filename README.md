# Brutalist Portfolio // Samy Barsoum

The source code for my personal web development portfolio. Designed with a strict black-and-white brutalist aesthetic, focusing on stark contrasts, sharp edges, aggressive typography, and high performance.

**Live Site:** [samybit-github-io.vercel.app]

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **3D & WebGL:** React Three Fiber, Drei, & Spline
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email Service:** Resend (via Next.js Server Actions)

## Key Features

- **Strict Brutalism & Theming:** Pure CSS variables, zero border-radius, heavy drop-shadows, and a custom 3-way theme engine (Light, Hardware Invert, Ember).
- **Optimized 3D Integration:** Interactive WebGL elements and Spline scenes with viewport-triggered rendering (0% GPU usage when scrolled out of view).
- **Magnetic Scroll Physics:** Zero-JS, native CSS Scroll Snapping (`100dvh`) for perfectly aligned, full-screen section transitions.
- **Serverless Contact Form:** Uses Next.js Server Actions and the Resend API to handle form submissions directly.

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/samybit/portfolio
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your Resend API key:

```env
RESEND_API_KEY=re_your_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## License

MIT