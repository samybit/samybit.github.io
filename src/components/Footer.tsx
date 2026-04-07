export default function Footer() {
  return (
    <footer className="bg-white border-t-8 border-black p-6 md:p-12 text-center flex flex-col items-center justify-center gap-4">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
        Samy Barsoum
      </h2>
      <p className="text-xl font-bold uppercase text-zinc-500">
        © {new Date().getFullYear()} / Built with Next.js & Brutalism.
      </p>
      <a
        href="#"
        className="mt-4 text-lg font-bold uppercase border-b-4 border-black pb-1 hover:bg-black hover:text-white transition-colors"
      >
        ↑ Back to top
      </a>
    </footer>
  );
}