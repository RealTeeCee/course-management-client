import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  onGetTrackingLesson,
  onLoadProgress,
  onSaveTrackingLesson,
  onSelectedLesson,
} from "../../store/course/courseSlice";
import { useEffect, useState } from "react";
import { selectEnrollIdAndCourseId } from "../../store/course/courseSelector";
const { Panel } = Collapse;

const CollapseAntCom = ({
  type = "default",
  slug = "/",
  openKeys = ["1"],
  onChange = () => {},
  isOpen = false,
  parentItems = [],
  childItems = [],
  isLearning = false,
}) => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const reqParams = new URLSearchParams(location.search);
  // Load video when select lesson.
  const { tracking, video, selectedCourse, sectionId } = useSelector(
    (state) => state.course
  );

  const { enrollId, courseId } = useSelector(selectEnrollIdAndCourseId);

  const [lessionId, setLessionId] = useState(0);
  //  const lessionId = reqParams.get("id");
  const dispatch = useDispatch();

  const ids = parentItems.map((item) => String(item.id));

  const handleClick = (child) => {
    setLessionId(child.id);
    dispatch(
      onSelectedLesson({ sectionId: child.sectionId, lessonId: child.id })
    );
  };

  useEffect(() => {
    console.log(tracking, isLearning);
    if (isLearning && tracking?.lessonId > 0) {
      setLessionId(tracking.lessonId);
      navigate(`/learn/${slug}?id=${tracking.lessonId}`);
    }
  }, [isLearning, navigate, slug, tracking]);

  //Save Tracking Lesson
  useEffect(() => {
    if (video && selectedCourse && video.lessonId && video.id) {
      let timer = setTimeout(
        () =>
          dispatch(
            onSaveTrackingLesson({
              lessonId: video.lessonId,
              sectionId: sectionId,
              videoId: video.id,
              courseId: selectedCourse.id,
              enrollmentId: enrollId,
            })
          ),
        1500 // run after 5s when user select lesson
      );
      // clean up previous timer if user select lesson in interval (< 5s)
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, enrollId, sectionId, selectedCourse, video]);

  //Load progress
  useEffect(() => {
    dispatch(
      onLoadProgress({
        enrollmentId: enrollId,
        courseId: courseId,
      })
    );
  }, [courseId, dispatch, enrollId]);

  return parentItems.length === 0 ? null : (
    <Collapse
      // defaultActiveKey={["1"]}
      // activeKey={isOpen ? ["1", "2", "3"] : openKeys}
      defaultActiveKey={String(parentItems[0]?.id)}
      activeKey={isOpen ? ids : openKeys}
      // activeKey={openKeys}
      onChange={onChange}
      size="large"
    >
      {parentItems &&
        parentItems.length > 0 &&
        parentItems.map((parent, index) => {
          let lessionNo = 1;
          return (
            <Panel header={parent.name} key={parent.id}>
              {childItems &&
                childItems.length > 0 &&
                // eslint-disable-next-line array-callback-return
                childItems.map((child, i) => {
                  if (child.sectionId === parent.id) {
                    if (type === "learn") {
                      return (
                        <Link
                          onClick={() => handleClick(child)}
                          to={`/learn/${slug}?id=${child.id}`}
                          key={child.id}
                          className={`flex justify-between items-center ${
                            parseInt(lessionId) === child.id
                              ? "text-tw-primary"
                              : false
                          }`}
                        >
                          <span>
                            {lessionNo++}. {child.name}
                          </span>
                          <span>{child.duration}</span>
                        </Link>
                      );
                    } else {
                      return (
                        <div
                          key={child.id}
                          className="flex justify-between items-center"
                        >
                          <span>
                            {lessionNo++}. {child.name}
                          </span>
                          <span>{child.duration}</span>
                        </div>
                      );
                    }
                  }
                })}
            </Panel>
          );
        })}
      {/* <Panel header="Introduce" key="1">
        <div className="flex justify-between items-center">
          <span>1.{text}</span>
          <span>03:58</span>
        </div>
      </Panel>
      <Panel header="How to install PHP" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="Learning PHP core" key="3">
        <p>{text}</p>
      </Panel> */}
    </Collapse>
  );
};
export default CollapseAntCom;
