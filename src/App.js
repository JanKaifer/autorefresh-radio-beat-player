import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const isNotBroken = (video) => !!(!video.ended && video.readyState > 2);

export default function App() {
  const audioRef = useRef(null);
  const [showCoolBackground] = useState(() => Math.random() > 0.95);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const playVideo = async () => {
    await audioRef.current.play();
  };

  useEffect(() => {
    try {
      window.audio = audioRef.current;
      playVideo();
    } catch (e) {
      console.log("unable to autoplay video", e);
    }
  });

  const refreshAudio = async () => {
    try {
      setRefreshCounter((v) => v + 1);
      await audioRef.current.load();
    } catch (e) {
      console.log("unable to restart video", e);
    }
  };

  useEffect(() => {
    const pid = setInterval(() => {
      if (!isNotBroken(audioRef.current)) {
        refreshAudio();
      }
    }, 10000);

    return () => clearInterval(pid);
  });

  return (
    <div className={`App ${showCoolBackground ? "cool-background" : ""}`}>
      <h2 style={{ backgroundColor: "white" }}>
        Restart counter {refreshCounter}
      </h2>
      <audio
        controls
        onStalled={refreshAudio}
        onError={refreshAudio}
        onLoad={playVideo}
        onLoadedData={playVideo}
        ref={audioRef}
        src="https://icecast5.play.cz/radiobeat128.mp3"
      />
    </div>
  );
}
