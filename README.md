# Brutalist Portfolio // Samy Barsoum

The source code for my personal web development portfolio. Designed with a strict black-and-white brutalist aesthetic, focusing on stark contrasts, sharp edges, aggressive typography, and high performance.

**Live Site:** [samybit-github-io.vercel.app]

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email Service:** Resend (via Next.js Server Actions)

## Key Features

- **Strict Brutalism:** Pure CSS variables, zero border-radius, and hard drop-shadows
- **Custom Floating Nav:** Interactive, out-of-flow navigation with a heavy, snapping mobile menu
- **Serverless Contact Form:** Uses Next.js Server Actions and the Resend API to handle form submissions without dedicated API routes
- **Scroll Animations:** Viewport-triggered kinetic typography and staggered grid reveals using Framer Motion

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/samybit/samybit.github.io
cd samybit.github.io
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