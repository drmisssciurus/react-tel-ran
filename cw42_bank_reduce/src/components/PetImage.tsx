import catIdle from '../assets/cat.png';
import catFeed from '../assets/cat-feed.png';
import catPlay from '../assets/play-cat.png';
import catSleep from '../assets/cat-sleep.png';
import type { PetMood } from '../features/pet/petMood';

const images: Record<PetMood, string> = {
  idle: catIdle,
  feed: catFeed,
  play: catPlay,
  sleep: catSleep,
};

type PetImageProps = {
  mood: PetMood;
};

function PetImage({ mood }: PetImageProps) {
  return (
    <div className="pet-image-frame" key={mood}>
      <img src={images[mood]} alt={`Cat is ${mood}`} />
    </div>
  );
}

export default PetImage;
