import React, { useState, useRef, useEffect } from "react";
import "./StyledVideo.css";

export default function StyledVideo({
  src,
  poster,
  width = "100%",
  height = "auto",
  className = "",
  loop = true,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;        // MUST be muted to autoplay
      video.playsInline = true;  // important for mobile Safari
      video.autoplay = true;     // hint for autoplay

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch((err) => {
            console.log("Autoplay failed, user interaction required:", err);
            setPlaying(false);
          });
      }
    }
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className={`video-container ${className}`}
      style={{ width, height, position: "relative" }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted
        playsInline
        className="video-element"
        style={{ width: "100%", height: "100%", borderRadius: 12 }}
        onClick={togglePlay}
      />
      {!playing && (
        <button
          className="play-button-overlay"
          onClick={togglePlay}
          aria-label="Play video"
        >
          ▶
        </button>
      )}
    </div>
  );
}
