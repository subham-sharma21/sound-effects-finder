import { useState } from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SoundCard({ sound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(sound.previewUrl));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle audio ending
  audio.onended = () => {
    setIsPlaying(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base">{sound.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {sound.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {sound.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{sound.tags.length - 3}
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Duration: {sound.duration}s</p>
          <p>By: {sound.username}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button size="sm" variant="ghost" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button size="sm" variant="outline" asChild>
          <a href={sound.downloadUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-1" />
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

