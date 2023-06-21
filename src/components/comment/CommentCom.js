import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GapYCom from "../common/GapYCom";
import { TextEditorQuillCom } from "../texteditor";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../button";
import { BASE_API_URL, IMAGE_DEFAULT } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserId } from "../../store/auth/authSelector";
import {
  onSaveLikeOfPost,
  onSavePost,
  onSaveReplyToPost,
} from "../../store/course/courseSlice";
import { selectAllCourseState } from "../../store/course/courseSelector";

const schemaValidation = yup.object().shape({
  comment: yup.string(),
  // .required(MESSAGE_FIELD_REQUIRED)
});

const CommentCom = ({
  title,
  placeholder = "Leave your comment here...",
  commentUrl = "",
  replyUrl = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowCommentBox, setIsShowCommentBox] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    let url = BASE_API_URL + `/post/stream/${courseId}`;
    const sse = new EventSource(url);

    sse.addEventListener("post-list-event", (event) => {
      //console.log(event);
      const data = JSON.parse(event.data);
      console.log(data);
      setPosts(data);
    });

    sse.onerror = () => {
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  const user = useSelector(selectUser);
  const { courseId } = useSelector(selectAllCourseState);

  const handleSubmitForm = ({ comment }) => {
    // console.log(values);
    dispatch(onSavePost({ courseId, userId: user.id, content: comment }));

    setTimeout(() => setIsShowCommentBox(false), 1500);
  };
  return (
    <section className="comment-box">
      {title && (
        <React.Fragment>
          <h4>Comment</h4>
          <hr />
        </React.Fragment>
      )}
      {/* Comment Items */}
      <ul>
        {posts.map((p) => (
          <React.Fragment key={p.id}>
            <CommentParent
              image={p.postImageUrl == null ? IMAGE_DEFAULT : p.postImageUrl}
              userName={p.userName}
              role={p.role}
              parentComment={p.content}
              userPostId={p.userId}
              postId={p.id}
              replyCount={p.comments.length}
              likeCount={p.likedUsers.length}
              likeUsers={p.likedUsers}
            ></CommentParent>
            {p.comments.map((c) => (
              <CommentChild
                key={c.id}
                image={c.imageUrl}
                userName={c.userName}
                role={c.role}
                childComment={c.content}
              ></CommentChild>
            ))}
          </React.Fragment>
        ))}
        {/*<CommentParent
          image="https://imgix.ranker.com/user_node_img/50081/1001612215/original/live-for-our-friends-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375"
          userName="Erza Scarlet"
          role="USER"
          parentComment="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
        ></CommentParent>*/}
      </ul>
      <GapYCom></GapYCom>
      <div
        className="flex justify-center items-center"
        onClick={() => setIsShowCommentBox(!isShowCommentBox)}
      >
        {isShowCommentBox ? (
          <ButtonCom backgroundColor="danger">Hide</ButtonCom>
        ) : (
          <ButtonCom>Comment</ButtonCom>
        )}
      </div>
      <GapYCom></GapYCom>
      {isShowCommentBox && (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <TextEditorQuillCom
            value={comment}
            onChange={(comment) => {
              setValue("comment", comment);
              setComment(comment);
            }}
            placeholder={placeholder}
          ></TextEditorQuillCom>
          <GapYCom className="mb-5"></GapYCom>
          <div>
            <ButtonCom
              type="submit"
              backgroundColor="pink"
              isLoading={isLoading}
            >
              Send
            </ButtonCom>
            <ButtonCom
              className="!text-black ml-2"
              backgroundColor="gray"
              onClick={() => setIsShowCommentBox(false)}
            >
              Close
            </ButtonCom>
          </div>
        </form>
      )}
    </section>
  );
};

const CommentParent = ({
  image = IMAGE_DEFAULT,
  userName = "No Name",
  role = "USER",
  parentComment,
  postId,
  userPostId,
  replyCount = 0,
  likeCount = 0,
  likeUsers,
}) => {
  const user = useSelector(selectUser);
  const [isLiked, setLiked] = useState(
    likeUsers.find((like) => like.id === user.id) ? true : false
  );
  const [isReply, setIsReply] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [likeNum, setLikeNum] = useState(likeCount);

  useEffect(() => {
    setLikeNum(likeCount);
  }, [likeCount]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const dispatch = useDispatch();

  const handleLike = () => {
    setLiked(!isLiked);
    if (!isLiked) {
      setLikeNum(likeNum + 1);
    } else {
      setLikeNum(likeNum - 1);
    }
    dispatch(onSaveLikeOfPost({ postId, userId: user.id }));
  };

  const handleReply = (isReply) => {
    setIsReply(!isReply);
  };
  // Comment Parent
  const handleSubmitForm = ({ comment }) => {
    console.log({ postId, userId: userPostId, content: comment });
    // Call tới api replyUrl ở trên truyền vào, ko set cứng để bên Blog xài lại
    dispatch(onSaveReplyToPost({ postId, userId: user.id, content: comment }));
    setTimeout(() => setIsReply(false), 1500);
  };
  return (
    <li>
      <div className="media align-self-center">
        <img
          className="object-cover"
          srcSet={image}
          alt={`${userName} avatar`}
        />
        <div className="media-body">
          <div className="row">
            <div className="col-md-4">
              <h6 className="mt-0">
                {userName} <span>( {role} )</span>
              </h6>
            </div>
            <div className="col-md-8">
              <ul className="comment-social float-start float-md-end">
                <li
                  className={`${
                    isLiked ? "text-primary" : ""
                  } cursor-pointer transition-all duration-300`}
                  onClick={handleLike}
                >
                  <i className="icofont icofont-thumbs-up"></i>
                  {likeNum} Liked
                </li>
                <li
                  className={`${
                    isReply && "text-primary"
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => handleReply(isReply)}
                >
                  <i className="icofont icofont-ui-chat"></i>
                  {replyCount} Reply
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: parentComment }}></div>
            {isReply && (
              <React.Fragment>
                <GapYCom className="mb-4"></GapYCom>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                  <TextEditorQuillCom
                    value={comment}
                    onChange={(comment) => {
                      setValue("comment", comment);
                      setComment(comment);
                    }}
                    placeholder={"Leave your reply here..."}
                  ></TextEditorQuillCom>
                  <div className="mt-14">
                    <ButtonCom
                      type="submit"
                      backgroundColor="pink"
                      isLoading={isLoading}
                    >
                      Reply
                    </ButtonCom>
                    <ButtonCom
                      className="!text-black ml-2"
                      backgroundColor="gray"
                      onClick={() => setIsReply(false)}
                    >
                      Close
                    </ButtonCom>
                  </div>
                </form>
                <GapYCom className="mb-4"></GapYCom>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

const CommentChild = ({
  image = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  userName = "Ric Phạm",
  role = "ADMIN",
  childComment = "Thanks for your comment!",
}) => {
  return (
    <li>
      <ul>
        <li>
          <div className="media">
            <img
              className="object-cover"
              srcSet={image == null ? IMAGE_DEFAULT : image}
              alt={`${userName} avatar`}
            />
            <div className="media-body">
              <div className="row">
                <div className="col-xl-12">
                  <h6 className="mt-0">
                    {userName}
                    <span>( {role} )</span>
                  </h6>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: childComment }}></div>
            </div>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default CommentCom;
