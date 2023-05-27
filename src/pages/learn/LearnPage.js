import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";

const LearnPage = () => {
  const { slug } = useParams(); // Course Slug
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <HeadingH1Com>Learn Page</HeadingH1Com>
      <GapYCom></GapYCom>
      <div className="video-container">
        <div className="video-item">
          <ReactPlayer
            width="100%"
            height="500px"
            url="https://www.youtube.com/watch?v=C1AxTBJJN64"
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: 1 },
              },
            }}
            playing={isPlaying}
            onClick={handleTogglePlay}
          />
        </div>
        <div>
          <button onClick={handleTogglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LearnPage;
