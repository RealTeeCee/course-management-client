import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetEnrollId,
  onMyCourseLoading,
  onSelectedCourse,
} from "../../store/course/courseSlice";

const LearnPage = () => {
  const { slug } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    data,
    selectedCourse,
    video,
    video: { captionData },
  } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(onMyCourseLoading(user.id));
    }
    if (data?.length > 0) {
      dispatch(onSelectedCourse(slug));
    }
  }, [data?.length, dispatch, slug, user.id]);

  useEffect(() => {
    if (selectedCourse) {
      console.log("selectedCourse:", selectedCourse);
      dispatch(
        onGetEnrollId({ course_id: selectedCourse.id, user_id: user.id })
      );
    }
  }, [dispatch, selectedCourse, user.id]);

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
            url={video.url}
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: 1 },
              },
              file: {
                tracks:
                  captionData &&
                  Object.entries(captionData)?.map(([lang, src]) => ({
                    kind: "subtitles",
                    src: src,
                    srcLang: lang,
                    default: lang === "en",
                  })),
                attributes: {
                  controlsList: "nodownload",
                  crossOrigin: "noorigin",
                },
              },
            }}
            playing={isPlaying}
            controls
            muted
            autoPlay
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
