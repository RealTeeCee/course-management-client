import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";
import { selectUserId } from "../../store/auth/authSelector";
import {
  selectAllCourseState,
  selectIsLoadLearningStatus,
} from "../../store/course/courseSelector";
import {
  onGetEnrollId,
  onGetLearning,
  onGetTrackingLesson,
  onMyCourseLoading,
  onSaveTrackingVideo,
  onSelectedCourse,
  onUpdateCompletedVideo,
} from "../../store/course/courseSlice";

const LearnPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeek, setIsSeek] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { slug } = useParams();

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
    isSelectLessonManual,
    resumePoint,
  } = useSelector(selectAllCourseState);
  const isLoadLearningStatus = useSelector(selectIsLoadLearningStatus);
  console.log("isLoadLearningStatus:", isLoadLearningStatus);
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
      dispatch(onGetLearning(courseId));
    }
  }, [dispatch, courseId, userId]);

  useEffect(() => {
    if (isLoadLearningStatus) {
      dispatch(onGetTrackingLesson({ enrollmentId: enrollId, courseId }));
    }
  }, [courseId, dispatch, enrollId, isLoadLearningStatus]);

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

  const handleGetProgress = ({ played }) => {
    if (played > 0.9) {
      setIsCompleted(true);
    }
  };

  const handleEnded = () => {
    if (lessonId > 0 && video.id > 0 && sectionId > 0) {
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

  const handlePauseVideo = () => {
    console.log("handlePauseVideo: ", isSeek, lessonId);
    if (lessonId > 0 && video.id > 0 && sectionId > 0) {
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
    if (lessonId > 0 && video.id > 0 && sectionId > 0) {
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
  console.log(isSelectLessonManual, resumePoint);
  useEffect(() => {
    console.log(isSelectLessonManual, resumePoint);
    if (isSelectLessonManual) {
      setIsPlaying(true);
      player.current.seekTo(resumePoint);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      player.current.seekTo(tracking ? tracking.resumePoint : 0);
      setIsPlaying(false);
    }
  }, [isSelectLessonManual, resumePoint, tracking]);

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
