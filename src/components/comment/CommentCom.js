import { useState } from "react";
import { useForm } from "react-hook-form";
import GapYCom from "../common/GapYCom";
import { TextEditorQuillCom } from "../texteditor";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonCom } from "../button";
import { IMAGE_DEFAULT } from "../../constants/config";

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
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowCommentBox, setIsShowCommentBox] = useState(false);

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

  const handleSubmitForm = (values) => {
    console.log(values);
    // call tới api commentUrl từ ngoài truyền vào, ko set cứng để bên Blog xài lại

    // if (convertStrMoneyToInt(net_price) > convertStrMoneyToInt(price)) {
    //   const netPriceSelector = document.querySelector(
    //     'input[name="net_price"]'
    //   );
    //   if (netPriceSelector) netPriceSelector.focus();
    //   toast.error(MESSAGE_GENERAL_FAILED);
    //   setError("net_price", { message: MESSAGE_NET_PRICE_HIGHER_PRICE });
    // } else {
    //   try {
    //     setIsLoading(!isLoading);
    //     const fd = new FormData();
    //     fd.append(
    //       "courseJson",
    //       JSON.stringify({
    //         ...values,
    //         status: 0,
    //         price: convertStrMoneyToInt(price),
    //         net_price: convertStrMoneyToInt(net_price),
    //       })
    //     );
    //     const res = await axiosBearer.post(`/course`, fd);
    //     toast.success(`${res.data.message}`);
    //     resetValues();
    //     navigate("/admin/courses");
    //   } catch (error) {
    //     showMessageError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  };
  return (
    <section className="comment-box">
      {title && (
        <>
          <h4>Comment</h4>
          <hr />
        </>
      )}
      {/* Comment Items */}
      <ul>
        <CommentParent
          image="https://imgix.ranker.com/user_node_img/50081/1001612215/original/live-for-our-friends-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375"
          userName="Erza Scarlet"
          role="USER"
          parentComment="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
        ></CommentParent>
        <CommentChild
          image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          userName="Ric Phạm"
          role="ADMIN"
          childComment="Thanks for your comment!"
        ></CommentChild>
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
}) => {
  const [isLiked, setLiked] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLike = (isLiked) => {
    setLiked(!isLiked);
  };

  const handleReply = (isReply) => {
    setIsReply(!isReply);
  };
  // Comment Parent
  const handleSubmitForm = (values) => {
    console.log(values);
    // Call tới api replyUrl ở trên truyền vào, ko set cứng để bên Blog xài lại

    // if (convertStrMoneyToInt(net_price) > convertStrMoneyToInt(price)) {
    //   const netPriceSelector = document.querySelector(
    //     'input[name="net_price"]'
    //   );
    //   if (netPriceSelector) netPriceSelector.focus();
    //   toast.error(MESSAGE_GENERAL_FAILED);
    //   setError("net_price", { message: MESSAGE_NET_PRICE_HIGHER_PRICE });
    // } else {
    //   try {
    //     setIsLoading(!isLoading);
    //     const fd = new FormData();
    //     fd.append(
    //       "courseJson",
    //       JSON.stringify({
    //         ...values,
    //         status: 0,
    //         price: convertStrMoneyToInt(price),
    //         net_price: convertStrMoneyToInt(net_price),
    //       })
    //     );
    //     const res = await axiosBearer.post(`/course`, fd);
    //     toast.success(`${res.data.message}`);
    //     resetValues();
    //     navigate("/admin/courses");
    //   } catch (error) {
    //     showMessageError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
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
                    isLiked && "text-primary"
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => handleLike(isLiked)}
                >
                  <i className="icofont icofont-thumbs-up"></i>02 Liked
                </li>
                <li
                  className={`${
                    isReply && "text-primary"
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => handleReply(isReply)}
                >
                  <i className="icofont icofont-ui-chat"></i>1 Reply
                </li>
              </ul>
            </div>
          </div>
          <p>
            {parentComment}
            {isReply && (
              <>
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
              </>
            )}
          </p>
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
              srcSet={image}
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
              <p>{childComment}</p>
            </div>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default CommentCom;
