import { useState } from 'react';
import './PetPage.css';
import PetImage from '../components/PetImage.tsx';
import PetStatus from '../components/PetStatus.tsx';
import PetControls from '../components/PetControls.tsx';
import type { PetMood } from '../features/pet/petMood';

function PetPage() {
  const [mood, setMood] = useState<PetMood>('idle');

  return (
    <div className="pet-page">
      <PetImage mood={mood} />
      <PetStatus />
      <PetControls onAction={setMood} />
    </div>
  );
}

export default PetPage;
