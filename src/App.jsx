import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SoundGrid } from './components/SoundGrid';
import { Footer } from './components/Footer';
import { searchSounds } from './lib/api';
import './App.css';

function App() {
  const [sounds, setSounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchSounds(query);
      
      // Transform API response to match our component's expected format
      const formattedSounds = response.results.map(sound => ({
        id: sound.id,
        name: sound.name,
        tags: sound.tags,
        duration: sound.duration,
        username: sound.username,
        previewUrl: sound.previews ? sound.previews['preview-hq-mp3'] : '',
        downloadUrl: sound.download,
      }));
      
      setSounds(formattedSounds);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search for sound effects. Please try again later.');
      setSounds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial sounds
  useEffect(() => {
    const loadInitialSounds = async () => {
      setIsLoading(true);
      try {
        const response = await searchSounds('');
        
        // Transform API response to match our component's expected format
        const formattedSounds = response.results.map(sound => ({
          id: sound.id,
          name: sound.name,
          tags: sound.tags,
          duration: sound.duration,
          username: sound.username,
          previewUrl: sound.previews ? sound.previews['preview-hq-mp3'] : '',
          downloadUrl: sound.download,
        }));
        
        setSounds(formattedSounds);
      } catch (err) {
        console.error('Initial load error:', err);
        setError('Failed to load sound effects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialSounds();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary/5 py-12">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find the Perfect Sound Effect
            </h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground">
              Search thousands of royalty-free sound effects for your next project.
              Download high-quality audio files instantly.
            </p>
            <div className="mt-6 w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>
        
        <section className="container py-8">
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {searchQuery && (
            <h2 className="text-2xl font-bold mb-6">
              Results for "{searchQuery}"
            </h2>
          )}
          
          <SoundGrid sounds={sounds} isLoading={isLoading} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

