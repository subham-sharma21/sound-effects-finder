export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SoundFX Finder. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by Freesound API
        </p>
      </div>
    </footer>
  );
}

