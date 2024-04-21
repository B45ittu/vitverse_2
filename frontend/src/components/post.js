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

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Close = <CloseIcon />;

  return (
    <div className="post">
      <div className="post_info">
        <Avatar />
        <h4>username</h4>
        <small>time stamp</small>
      </div>
      <div className="post_body">
        <p>this is the question.</p>
        <Button className="post_btnAnswer" onClick={() => setIsModalOpen(true)}>
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
            <h1>this is question</h1>
            <p>
              asked by <span className="name">"username"</span> on {"time"}
              <span className="name">
                {/* {new Date(post?.createdAt).toLocaleString()} */}
              </span>
            </p>
          </div>
          <div className="modal__answer">
            <ReactQuill
              // value={answer}
              // onChange={handleQuill}
              placeholder="Enter your answer"
            />
          </div>
          <div className="modal__buttons">
            <button className="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="add">
              Add Question
            </button>
          </div>
        </Modal>
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
          margin: "10px 0",
        }}
      >
        1 Answer
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
            <Avatar />
            <div
              style={{
                margin: "0px 10px",
              }}
              className="post_info"
            >
              <p>username</p>
              <span>timestamp</span>
            </div>
          </div>
          <div className="post-answer">this is answer</div>
        </div>
        
      </div>
    </div>
  );
}

export default Post;
