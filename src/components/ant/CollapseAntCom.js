import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllCourseState } from "../../store/course/courseSelector";
import {
  onLoadProgress,
  onSaveTrackingLesson,
  onSelectedLesson,
} from "../../store/course/courseSlice";
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

  const { enrollId, courseId, video, sectionId, lessonId, tracking } =
    useSelector(selectAllCourseState);

  const [lessionId, setLessionId] = useState(0);
  //  const lessionId = reqParams.get("id");
  const dispatch = useDispatch();

  const ids = parentItems.map((item) => String(item.id));

  const handleClick = (child) => {
    setLessionId(child.id);
    // navigate(`/learn/${slug}?id=${child.id}`);
    dispatch(
      onSelectedLesson({ sectionId: child.sectionId, lessonId: child.id })
    );
  };

  useEffect(() => {
    if (isLearning && tracking?.lessonId > 0 && lessonId === 0) {
      setLessionId(tracking.lessonId);
      navigate(`/learn/${slug}?id=${tracking.lessonId}`);
      dispatch(
        onSelectedLesson({
          sectionId: tracking.sectionId,
          lessonId: tracking.lessonId,
        })
      );
    }
  }, [isLearning, navigate, slug, tracking, lessonId, dispatch]);

  //Save Tracking Lesson
  useEffect(() => {
    console.log("Save Tracking sectionId: ", sectionId);

    if (
      video &&
      courseId &&
      lessonId > 0 &&
      video.id > 0 &&
      //nguyen add
      sectionId > 0
    ) {
      let timer = setTimeout(
        () =>
          dispatch(
            onSaveTrackingLesson({
              lessonId: lessonId,
              sectionId: sectionId,
              videoId: video.id,
              courseId: courseId,
              enrollmentId: enrollId,
            })
          ),
        500 // run after 5s when user select lesson
      );
      // clean up previous timer if user select lesson in interval (< 1.5s)
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, enrollId, sectionId, courseId, video, lessonId]);

  //Load progress
  useEffect(() => {
    if (enrollId > 0 && courseId > 0) {
      dispatch(
        onLoadProgress({
          enrollmentId: enrollId,
          courseId: courseId,
        })
      );
    }
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
