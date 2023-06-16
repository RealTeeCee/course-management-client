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
  onManualSelectedLesson,
  onMyCourseLoading,
  onReady,
  onReload,
  onSaveTrackingVideo,
  onSelectedCourse,
  onUpdateCompletedVideo,
} from "../../store/course/courseSlice";
import { DialogNextVideo, RatingMuiCom } from "../../components/mui";
import { TabsAntCom } from "../../components/ant";
import TextEditorQuillCom from "../../components/texteditor/TextEditorQuillCom";
import { CommentCom } from "../../components/comment";
import { NoteCom } from "../../components/note";

const LearnPage = () => {
  const {
    data,
    courseId,
    enrollId,
    lessonId,
    video,
    video: { captionData },
    sectionId,
    tracking,
    isReady,
    isReload,
    learning,
    progress,
  } = useSelector(selectAllCourseState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeek, setIsSeek] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  // const [isReady, setIsReady] = useState(ready);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const { slug } = useParams();

  const userId = useSelector(selectUserId);

  const isLoadLearningStatus = useSelector(selectIsLoadLearningStatus);

  const dispatch = useDispatch();
  const player = useRef();

  console.log("isReady: " + isReady + " isReload: " + isReload);

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(onMyCourseLoading(userId));
    }
    if (data?.length > 0) {
      dispatch(onSelectedCourse(slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length, slug, userId]);

  useEffect(() => {
    if (courseId) {
      dispatch(onGetEnrollId({ course_id: courseId, user_id: userId }));
      dispatch(onGetLearning(courseId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, userId]);

  useEffect(() => {
    console.log("isLoadLearningStatus", isLoadLearningStatus);
    if (isLoadLearningStatus) {
      dispatch(onGetTrackingLesson({ enrollmentId: enrollId, courseId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, enrollId, isLoadLearningStatus]);

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
    setPlayedSeconds(playedSeconds);
  };

  const handleEnded = () => {
    if (progress === 100) {
      setIsFinal(true);
    }
    console.log(isFinal);

    setIsEnd(true);
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

  const onWriteNote = () => {
    setIsPlaying(false);
  };

  const handleSeekVideo = () => {
    // console.log("handleSeekVideo - isPlaying: ", isPlaying);
    // setIsPlaying(false);
    // setIsSeek(true);
  };

  window.onbeforeunload = function (e) {
    dispatch(onReload(true));

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

  const handleOnReady = React.useCallback(() => {
    if (!isReady || isReload) {
      player.current.seekTo(tracking ? tracking.resumePoint : 0);
      dispatch(onReady(true));
      dispatch(onReload(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isReload, tracking]);

  const handleCloseDialog = () => {
    setIsEnd(false);
  };

  const handleNexVideo = () => {
    const nextVideo =
      learning.lessonDto[
        learning.lessonDto.findIndex((dto) => dto.id === tracking.lessonId) + 1
      ];

    console.log(nextVideo);
    if (nextVideo !== undefined) {
      dispatch(
        onManualSelectedLesson({
          enrollmentId: enrollId,
          courseId,
          sectionId: nextVideo.sectionId,
          lessonId: nextVideo.id,
        })
      );
    }

    setIsEnd(false);
  };

  const tabItems = [
    {
      key: "1",
      label: `Description`,
      children: `Description of Course.....`,
    },
    {
      key: "2",
      label: `Note`,
      children: <NoteCom notePoint={playedSeconds} onWriteNote={onWriteNote} />,
    },
    {
      key: "3",
      label: `Rating`,
      // check điều kiện user rating xong thì thêm props readOnly
      children: <RatingMuiCom defaultValue={3.5} readOnly></RatingMuiCom>,
    },
    {
      key: "4",
      label: `Comment`,
      children: <CommentCom />,
    },
  ];

  return (
    <>
      <DialogNextVideo
        open={isEnd}
        onClose={handleCloseDialog}
        onNext={handleNexVideo}
        isFinal={isFinal}
      ></DialogNextVideo>
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
            onReady={handleOnReady}
          />
        </div>
        <div>
          <button onClick={handleTogglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
      <TabsAntCom items={tabItems}></TabsAntCom>
    </>
  );
};

export default LearnPage;
