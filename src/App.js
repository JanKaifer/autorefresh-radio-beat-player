import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const isPlaying = (video) =>
  !!(
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );

export default function App() {
  const videoRef = useRef(null);
  const [showCoolBackground] = useState(() => Math.random() > 0.95);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    try {
      window.video = videoRef.current;
      videoRef.current.play();
    } catch (e) {
      console.log("unable to autoplay video", e);
    }
  });

  const refreshVideo = async () => {
    try {
      setRefreshCounter((v) => v + 1);
      await videoRef.current.play();
      await videoRef.current.load();
    } catch (e) {
      console.log("unable to restart video", e);
    }
  };

  useEffect(() => {
    const pid = setInterval(() => {
      if (!isPlaying(videoRef.current)) {
        refreshVideo();
      }
    }, 5000);

    return () => clearInterval(pid);
  });

  return (
    <div className={`App ${showCoolBackground ? "cool-background" : ""}`}>
      <h2 style={{ backgroundColor: "white" }}>
        Restart counter {refreshCounter}
      </h2>
      <video
        controls
        onStalled={refreshVideo}
        ref={videoRef}
        src="https://icecast5.play.cz/radiobeat128.mp3"
      />
    </div>
  );
}
