import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { selectUserId } from "../../store/auth/authSelector";
import { selectAllCourseState } from "../../store/course/courseSelector";
import {
  onGetEnrollId,
  onGetTrackingLesson,
  onMyCourseLoading,
  onSaveTrackingVideo,
  onSelectedCourse,
  onUpdateCompletedVideo,
} from "../../store/course/courseSlice";

const LearnPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSeek, setIsSeek] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [isEnded, setIsEnded] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const { slug } = useParams();

  // const { user } = useSelector((state) => state.auth);
  // const {
  //   data,
  //   selectedCourse,
  //   video,
  //   enrollId,
  //   tracking,
  //   video: { captionData },
  // } = useSelector((state) => state.course);

  const userId = useSelector(selectUserId);
  const {
    data,
    courseId,
    enrollId,
    lessonId,
    video,
    video: { captionData },
    sectionId,
    tracking,
    //nguyen add
    isSaved,
  } = useSelector(selectAllCourseState);

  const dispatch = useDispatch();
  const player = useRef();

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(onMyCourseLoading(userId));
    }
    if (data?.length > 0) {
      dispatch(onSelectedCourse(slug));
    }
  }, [data?.length, dispatch, slug, userId]);

  useEffect(() => {
    if (courseId) {
      dispatch(onGetEnrollId({ course_id: courseId, user_id: userId }));
    }
  }, [dispatch, courseId, userId]);

  useEffect(() => {
    console.log(
      "run useEffect onGetTrackingLesson lessonId: ",
      lessonId,
      "courseId: ",
      courseId,
      "enrollId: ",
      enrollId,
      "isSaved: ",
      isSaved
    );
    if (
      courseId > 0 &&
      enrollId > 0 &&
      lessonId > 0 &&
      //nguyen add
      isSaved
    ) {
      dispatch(
        onGetTrackingLesson({ enrollmentId: enrollId, courseId, lessonId })
      );
    }
  }, [dispatch, lessonId, courseId, enrollId, isSaved]);

  // useEffect(() => {
  //   // if(playedSeconds > 0) {
  //   if ((isPaused && !isSeek) || isEnded) {
  //     // const timer = setTimeout(() =>
  //     dispatch(
  //       onSaveTrackingVideo({
  //         enrollmentId: enrollId,
  //         courseId: courseId,
  //         sectionId: sectionId,
  //         lessonId: lessonId,
  //         videoId: video.id,
  //         resumePoint: playedSeconds,
  //       })
  //     );

  //     //,1000);return () => clearTimeout(timer);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isEnded, isPaused]);

  useEffect(() => {
    if (isCompleted) {
      setIsCompleted(false);
      dispatch(
        onUpdateCompletedVideo({
          enrollmentId: enrollId,
          courseId: courseId,
          sectionId: sectionId,
          lessonId: lessonId,
          videoId: video.id,
          resumePoint: player.current.getCurrentTime(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleGetProgress = ({ playedSeconds, played }) => {
    if (played > 0.9) {
      setIsCompleted(true);
    }
  };

  const handleEnded = () => {
    dispatch(
      onSaveTrackingVideo({
        enrollmentId: enrollId,
        courseId: courseId,
        sectionId: sectionId,
        lessonId: lessonId,
        videoId: video.id,
        resumePoint: player.current.getCurrentTime(),
      })
    );
  };

  const handlePauseVideo = () => {
    console.log("handlePauseVideo: ", isSeek, lessonId);
    if (lessonId > 0 && video.id > 0) {
      dispatch(
        onSaveTrackingVideo({
          enrollmentId: enrollId,
          courseId: courseId,
          sectionId: sectionId,
          lessonId: lessonId,
          videoId: video.id,
          resumePoint: player.current.getCurrentTime(),
        })
      );
    }
  };

  const handleSeekVideo = () => {
    setIsPlaying(false);
    setIsSeek(true);
  };

  window.onbeforeunload = function (e) {
    if (lessonId > 0 && video.id > 0) {
      dispatch(
        onSaveTrackingVideo({
          enrollmentId: enrollId,
          courseId: courseId,
          sectionId: sectionId,
          lessonId: lessonId,
          videoId: video.id,
          resumePoint: playedSeconds,
        })
      );
    }
  };

  useEffect(() => {
    console.log(
      "lessonId: " + lessonId + "  tracking.lessonId: " + tracking?.lessonId
    );
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    if (lessonId === tracking?.lessonId)
      player.current.seekTo(tracking.resumePoint);
    // setIsPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking?.lessonId]);

  return (
    <>
      <HeadingH1Com>Learn Page</HeadingH1Com>
      <GapYCom></GapYCom>
      <div className="video-container">
        <div className="video-item">
          <ReactPlayer
            ref={player}
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
            onSeek={handleSeekVideo}
            onProgress={handleGetProgress}
            onPause={handlePauseVideo}
            onEnded={handleEnded}
            onPlay={() => setIsPaused(false)}
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
