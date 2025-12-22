export function Header() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-3">
        <img
          src="/NostrBird.png"
          alt="Nostr"
          className="h-12 w-12 md:h-16 md:w-16"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Deploy a Team Nostr Relay for free
        </h1>
      </div>
      <p className="text-xl text-slate-300 mb-2">Setup guide for Fly.io + Neon DB</p>
      <p className="text-slate-400">
        Total time: ~20-30 minutes | Cost: $0/month forever
      </p>
    </div>
  );
}