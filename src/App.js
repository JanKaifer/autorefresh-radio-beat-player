import React, { useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.play();
  });

  return (
    <div className="App">
      <video
        onStalled={() => {
          videoRef.current.load();
          videoRef.current.play();
        }}
        ref={videoRef}
        src="https://icecast5.play.cz/radiobeat128.mp3"
      />
    </div>
  );
}
