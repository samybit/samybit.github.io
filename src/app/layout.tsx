import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Aggressive, geometric font perfect for brutalism
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samy | Full-Stack Developer",
  description: "Fresh graduate and web developer specializing in the MERN stack. Available for freelance, remote work, or full-time roles.",
  keywords: ["Full-Stack Developer", "MERN", "React", "Next.js", "Freelance Developer", "Web Development"],
  openGraph: {
    title: "Samy | Full-Stack Developer",
    description: "Building brutal, effective web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* selection:bg-black selection:text-white ensures even highlighting text 
        follows the stark brutalist theme 
      */}
      <body className={`${spaceGrotesk.className} bg-white text-black antialiased selection:bg-black selection:text-white`}>
        {children}
      </body>
    </html>
  );
}