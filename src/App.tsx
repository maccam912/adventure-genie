import { useState, useRef, useEffect } from 'react'
import './App.css'
import data from './data.json';
import BackgroundImage from './BackgroundImage';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageKey, setImageKey] = useState(0); // Add a key state to force re-render

  const currentPageStruct = data[currentPage];

  const handlePlayAudio = () => {
  if (audioRef.current) {
    audioRef.current.currentTime = 0; // Reset audio to start
    audioRef.current.play(); // Start playing the audio
    setIsPlaying(true); // Update state to reflect that audio is playing
  }
};

const handlePauseAudio = () => {
  if (audioRef.current) {
    audioRef.current.pause(); // Pause the audio
    setIsPlaying(false); // Update state to reflect that audio is paused
  }
};

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setImageKey(prevKey => prevKey + 1); // Update the key to restart the animation
  }
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    setImageKey(prevKey => prevKey + 1); // Update the key to restart the animation

  }

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
        audioRef.current.play();
    }
  }, [currentPageStruct, isPlaying]);


  return (
    <div className="page-container">
    <BackgroundImage key={imageKey} imageUrl={data[currentPage].imageUrl} alt={data[currentPage].alt} />
      <audio ref={audioRef} src={data[currentPage].audioUrl} />
      <p className="text">{data[currentPage].text}</p>
      <div className="buttons">
        <button disabled={isPlaying} className="button" onClick={handlePlayAudio}>Play</button>
        <button disabled={!isPlaying} className="button" onClick={handlePauseAudio}>Pause</button>
        <button disabled={currentPage === 0} onClick={prevPage} className="button">Back</button>
        <button disabled={currentPage === data.length - 1} onClick={nextPage} className="button">Next</button>
      </div>
    </div>
  )
}

export default App
