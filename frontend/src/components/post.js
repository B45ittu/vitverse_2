import React, { useState, useEffect } from "react";
import { Avatar, Button, Tooltip } from "@mui/material";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  RepeatOneOutlined,
  ChatBubbleOutlined,
  ShareOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import "./post.css";
import Modal from "react-responsive-modal";
import CloseIcon from "@mui/icons-material/Close";
import "react-responsive-modal/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { detectOffensiveLanguage } from "../algorithms/sensitivity";

function LastSeen({ date }) {
  return (
    <div>
      Last seen: <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post, setPosts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswer] = useState("");
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const Close = <CloseIcon />;
  const user = useSelector(selectUser);

  useEffect(() => {
    const votedPosts = JSON.parse(localStorage.getItem("votedPosts")) || [];
    setHasUpvoted(votedPosts.includes(`${post?._id}-upvote`));
    setHasDownvoted(votedPosts.includes(`${post?._id}-downvote`));
  }, [post?._id]);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleVote = async (type) => {
    if (
      (type === "upvote" && !hasUpvoted && !hasDownvoted) ||
      (type === "downvote" && !hasDownvoted && !hasUpvoted)
    ) {
      try {
        const updatedPost = {
          ...post,
          [type === "upvote" ? "upvotes" : "downvotes"]:
            post[type === "upvote" ? "upvotes" : "downvotes"] + 1,
        };
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === post._id ? updatedPost : prevPost
          )
        );
        const votedPosts = JSON.parse(localStorage.getItem("votedPosts")) || [];
        localStorage.setItem("votedPosts", JSON.stringify([...votedPosts, `${post?._id}-${type}`]));
        await axios.post(`/api/questions/${type}/${post?._id}`);
        setHasUpvoted(type === "upvote");
        setHasDownvoted(type === "downvote");
      } catch (error) {
        console.error(`Error ${type}ing post:`, error);
      }
    } else if (
      (type === "upvote" && hasDownvoted) ||
      (type === "downvote" && hasUpvoted)
    ) {
      try {
        const updatedPost = {
          ...post,
          upvotes: post.upvotes + (type === "upvote" ? 1 : -1),
          downvotes: post.downvotes + (type === "downvote" ? 1 : -1),
        };
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === post._id ? updatedPost : prevPost
          )
        );
        const votedPosts = JSON.parse(localStorage.getItem("votedPosts")) || [];
        localStorage.setItem("votedPosts", JSON.stringify(votedPosts.filter(id => id !== `${post?._id}-${type}`)));
        await axios.post(`/api/questions/${type}/${post?._id}`);
        setHasUpvoted(type === "upvote");
        setHasDownvoted(type === "downvote");
      } catch (error) {
        console.error(`Error ${type}ing post:`, error);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.questionName,
        text: `Check out this question: ${post.questionName}`,
        url: window.location.href,
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleSubmit = async () => {
    if (post?._id && answers !== "") {
      // Check for offensive language
      const isOffensive = detectOffensiveLanguage(answers);
      if (isOffensive) {
        alert("Your answer contains offensive language. Please revise it.");
        return;
      }
  
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { answer: answers, questionId: post?._id, user };
      try {
        await axios.post("/api/answers", body, config);
        alert("Answer added successfully");
        setIsModalOpen(false);
        window.location.href = "/";
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };

  // const handleAddAnswerClick = () => {
  //   if (post.user._id === user._id) {
  //     alert("You cannot answer your own question.");
  //     return;
  //   }
  //   setIsModalOpen(true);
  // };

  return (
    <div className="post">
      <div className="post_info">
        <Avatar src={post?.user?.photo}/>
        <h4>{post?.user?.userName}</h4>
        <small>
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post_body">
        <h3>{post?.questionName}</h3>
        <Button className="post_btnAnswer"  onClick={() => setIsModalOpen(true)}>
          Add answer
        </Button>
        <Modal
          open={isModalOpen}
          closeIcon={Close}
          onClose={() => setIsModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
          styles={{ overlay: { height: "auto" } }}
        >
          <div className="modal__question">
            <h1>{post?.questionName}</h1>
            <p>
              asked by <span className="name">{post?.user?.email}</span> on time
              <span className="name">
                {new Date(post?.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
          <div className="modal__answer">
            <ReactQuill
              value={answers}
              onChange={handleQuill}
              placeholder="Enter your answer"
            />
          </div>
          <div className="modal__buttons">
            <button className="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit} type="submit" className="add">
              Add Answer
            </button>
          </div>
        </Modal>
        {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <Tooltip title="Upvote" arrow>
            <span onClick={() => handleVote("upvote")}>
              <ArrowUpwardOutlined /> {post?.upvotes}
            </span>
          </Tooltip>
          <Tooltip title="Downvote" arrow>
            <span onClick={() => handleVote("downvote")}>
              <ArrowDownwardOutlined /> {post?.downvotes}
            </span>
          </Tooltip>
        </div>
        {/* <Tooltip title="Repeat" arrow>
          <RepeatOneOutlined />
        </Tooltip>
        <Tooltip title="Comment" arrow>
          <ChatBubbleOutlined />
        </Tooltip> */}
        <div className="post__footerRight">
          <Tooltip title="Share" arrow>
            <ShareOutlined onClick={handleShare} />
          </Tooltip>
          {/* <Tooltip title="More" arrow>
            <MoreHorizOutlined />
          </Tooltip> */}
        </div>
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "7px 0",
        }}
      >
        <bold>Answer(s): </bold>
        {post?.allAnswers.length}
      </p>

      {/* all answers for the questions */}
      <div className="post_answer">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "10px 5px",
            borderTop: "1px solid lightgray",
          }}
          className="post-answer-container"
        >

          {post?.allAnswers?.map((ans) => (
            <div
              key={ans._id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                <Avatar src={ans?.user?.photo} />
                <div style={{ margin: "0px 10px" }} className="post-info">
                  <p>{ans?.user?.userName}</p>
                  <span>
                    <LastSeen date={ans?.createdAt} />
                  </span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(ans?.answer)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
