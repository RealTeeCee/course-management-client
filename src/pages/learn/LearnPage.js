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
  onSaveTrackingVideo,
  onSelectedCourse,
  onUpdateCompletedVideo,
} from "../../store/course/courseSlice";
import { func } from "prop-types";

const LearnPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const {
    data,
    selectedCourse,
    video,
    enrollId,
    sectionId,
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
  }, [data?.length, dispatch, slug, user]);

  useEffect(() => {
    if (selectedCourse) {
      console.log("selectedCourse:", selectedCourse);
      dispatch(
        onGetEnrollId({ course_id: selectedCourse.id, user_id: user?.id })
      );
    }
  }, [dispatch, selectedCourse, user]);

  useEffect(() => {
    // if(playedSeconds > 0) {
    if (isPaused || isEnded) {
      // const timer = setTimeout(() =>
      dispatch(
        onSaveTrackingVideo({
          enrollmentId: enrollId,
          courseId: selectedCourse.id,
          sectionId: sectionId,
          lessonId: video.lessonId,
          videoId: video.id,
          resumePoint: playedSeconds,
        })
      );
      setIsPaused(false);
      setIsEnded(false);
      //,1000);return () => clearTimeout(timer);
    }
  }, [
    dispatch,
    enrollId,
    isEnded,
    isPaused,
    playedSeconds,
    sectionId,
    selectedCourse,
    video.id,
    video.lessonId,
  ]);

  useEffect(() => {
    console.log("useEffect_isCompleted run: ", isCompleted);
    if (isCompleted) {
      setIsCompleted(false);
      dispatch(
        onUpdateCompletedVideo({
          enrollmentId: enrollId,
          courseId: selectedCourse.id,
          sectionId: sectionId,
          lessonId: video.lessonId,
          videoId: video.id,
          resumePoint: playedSeconds,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  console.log(playedSeconds);

  const handleGetProgress = ({ playedSeconds, played }) => {
    setPlayedSeconds(playedSeconds);
    if (played > 0.9) {
      setIsCompleted(true);
    }
  };

  const handleEnded = () => {
    setIsEnded(true);
  };

  const handlePauseVideo = () => {
    setIsPaused(true);
  };

  window.onbeforeunload = function (e) {
    dispatch(
      onSaveTrackingVideo({
        enrollmentId: enrollId,
        courseId: selectedCourse.id,
        sectionId: sectionId,
        lessonId: video.lessonId,
        videoId: video.id,
        resumePoint: playedSeconds,
      })
    );
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
            onProgress={handleGetProgress}
            onPause={handlePauseVideo}
            onEnded={handleEnded}
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
