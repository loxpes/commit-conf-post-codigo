export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm tracking-widest text-terminal-muted uppercase">
        <span className="text-terminal-accent">$</span> commit --conf
      </p>
      <h1 className="max-w-3xl text-balance text-4xl font-semibold text-terminal-fg sm:text-5xl md:text-6xl">
        Bienvenidos a la era post-código
      </h1>
      <p className="max-w-xl text-balance text-terminal-muted">
        <span className="text-terminal-accent-alt">{">"}</span> El rail está montado. El landing
        real se construye encima.
      </p>
      <footer className="mt-16 text-xs tracking-wide text-terminal-muted">
        commit · post-código · jorge martín
      </footer>
    </main>
  );
}
