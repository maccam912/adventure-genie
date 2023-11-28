import { useState, useRef, useEffect } from 'react'
import './App.css'
import BackgroundImage from './BackgroundImage';
import { CornersOut, SpeakerHigh, SpeakerSlash, ArrowArcRight, ArrowArcLeft, TextStrikethrough, TextT } from "@phosphor-icons/react";

type Data = {
  imageUrl: string;
  audioUrl: string;
  text: string;
  alt: string;
}[];

function App() {

  const storyNum = window.location.pathname.split("/")[1];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingText, setIsShowingText] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageKey, setImageKey] = useState(0); // Add a key state to force re-render
  const [data, setData] = useState<Data>([]);

  const BUCKET_BASE_URL = "https://pub-6acf4da73c2e48f3ae93769b3625d3b8.r2.dev"

  useEffect(() => {
    fetch(`${BUCKET_BASE_URL}/story${storyNum}/story${storyNum}.json`)
      .then((res) => res.json())
      .then((jsonData) => setData(() => jsonData));
  }, [])


  const currentPageStruct = data[currentPage];

  const handleToggleAudio = () => {
  if (isPlaying) {
  if (audioRef.current) {
    audioRef.current.pause(); // Pause the audio
    setIsPlaying(false); // Update state to reflect that audio is paused
  }
  } else {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play(); // Start playing the audio
      setIsPlaying(true); // Update state to reflect that audio is playing
    }
  }
};
const handleToggleText = () => {
  if (isShowingText) {
    setIsShowingText(false); // Update state to reflect that audio is paused
  } else {
    setIsShowingText(true); // Update state to reflect that audio is playing
  }
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
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

  const audioUrl = `${BUCKET_BASE_URL}/${currentPageStruct?.audioUrl}`
  const imageUrl = `${BUCKET_BASE_URL}/${currentPageStruct?.imageUrl}`

  return (
    <div className="page-container">
    {data[0] &&
    <>
    <BackgroundImage key={imageKey} imageUrl={imageUrl} alt={data[currentPage].alt} />
      <audio ref={audioRef} src={audioUrl} />
      {isShowingText && <p className="text">{data[currentPage].text}</p>}
      <div className="buttons">
        <button className="button" onClick={toggleFullScreen}><CornersOut /></button>
        <button className="button" onClick={handleToggleText}>{isShowingText ? <TextStrikethrough /> : <TextT />}</button>
        <button className="button" onClick={handleToggleAudio}>{isPlaying ? <SpeakerSlash /> : <SpeakerHigh />}</button>
        <button disabled={currentPage === 0} onClick={prevPage} className="button"><ArrowArcLeft /></button>
        <button disabled={currentPage === data.length - 1} onClick={nextPage} className="button"><ArrowArcRight /></button>
      </div>
      </>
      }
    </div>
  )
}

export default App
