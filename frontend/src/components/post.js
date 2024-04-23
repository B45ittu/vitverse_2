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

function LastSeen({ date }) {
  return (
    <div>
      Last seen: <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswer] = useState("");
  const handleQuill = (value) => {
    setAnswer(value);
  };
  const Close = <CloseIcon />;

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
        // user: user,
      };
      await axios
        .post("/api/answers", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added succesfully");
          setIsModalOpen(false);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="post">
      <div className="post_info">
        <Avatar />
        <h4>username</h4>
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
              asked by <span className="name">"username"</span> on {"time"}
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
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
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
        {post?.allAnswers?.map((ans) => (   //mapping every answer for the particular question. loop.
          <>
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
                  <p>{ans?.user}</p>
                  <span>
                    <LastSeen date={ans?.createdAt} />
                  </span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(ans?.answer)}</div>
            </div>
          </>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Post;
