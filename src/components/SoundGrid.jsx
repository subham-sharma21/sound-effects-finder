import { SoundCard } from './SoundCard';

export function SoundGrid({ sounds, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill().map((_, i) => (
          <div key={i} className="h-48 rounded-lg bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (sounds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No sound effects found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sounds.map((sound) => (
        <SoundCard key={sound.id} sound={sound} />
      ))}
    </div>
  );
}

