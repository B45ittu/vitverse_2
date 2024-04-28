import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
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

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleUpvote = async () => {
    if (!hasUpvoted) {
      try {
        const updatedPost = { ...post, upvotes: post.upvotes + 1 };
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === post._id ? updatedPost : prevPost
          )
        );
        await axios.post(`/api/questions/upvote/${post?._id}`);
        setHasUpvoted(true);
      } catch (error) {
        console.error("Error upvoting post:", error);
      }
    }
  };

  const handleDownvote = async () => {
    if (!hasDownvoted) {
      try {
        const updatedPost = { ...post, downvotes: post.downvotes + 1 };
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === post._id ? updatedPost : prevPost
          )
        );
        await axios.post(`/api/questions/downvote/${post?._id}`);
        setHasDownvoted(true);
      } catch (error) {
        console.error("Error downvoting post:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (post?._id && answers !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answers,
        questionId: post?._id,
        user: user,
      };
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

  return (
    <div className="post">
      <div className="post_info">
        <Avatar />
        <h4>userName</h4>
        <small>
          <LastSeen date={post?.createdAt} />
        </small>
      </div>
      <div className="post_body">
        <h3>{post?.questionName}</h3>
        <Button
          className="post_btnAnswer"
          onClick={() => {
            setIsModalOpen(true);
            console.log(post?._id);
          }}
        >
          Add answer
        </Button>
        <Modal
          open={isModalOpen}
          closeIcon={Close}
          onClose={() => setIsModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
          styles={{
            overlay: {
              height: "auto",
            },
          }}
        >
          <div className="modal__question">
            <h1>{post?.questionName}</h1>
            <p>
              asked by <span className="name">{user?.email}</span> on{" "}
              {"time"}
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
          <span onClick={handleUpvote}>
            <ArrowUpwardOutlined /> {post?.upvotes}
          </span>
          <span onClick={handleDownvote}>
            <ArrowDownwardOutlined />
            {post?.downvotes}
          </span>
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined />
        <div className="post__footerRight">
          <ShareOutlined />
          <MoreHorizOutlined />
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
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
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
