import React, { useState, useCallback } from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import "./QuoraHeader.css";
import {
  AssignmentTurnedInOutlined,
  ExpandMore,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
} from "@mui/icons-material";
import { FeaturedPlayList } from "@mui/icons-material";
import { Avatar, Button, Input } from "@mui/material";
import Modal from "react-responsive-modal";
import CloseIcon from "@mui/icons-material/Close";
import "react-responsive-modal/styles.css";
import axios from "axios";
import CodeIcon from "@mui/icons-material/Code";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

function QuoraHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const submitQuestion = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user,
      };
      try {
        const res = await axios.post("/api/questions", body, config);
        console.log(res.data);
        alert("Successfully added");
        window.location.href = "/";
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
        alert("Error in adding question");
      }
    }
  };

  const loggingOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("Logged out");
        })
        .catch(() => {
          console.log("Error in logging out");
        });
    }
  };

  const goToLeaderboard = useCallback(() => {
    navigate("/leaderboard");
  }, [navigate]);

  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="header-icons">
          <div className="header-icon">
            <CottageIcon onClick={goToHome}/>
          </div>
          <div className="header-icon">
            <FeaturedPlayList />
          </div>
          <div className="header-icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="header-icon">
            <PeopleAltOutlined />
          </div>
          <div className="header-icon">
            <NotificationsOutlined />
          </div>
          <div className="header-icon" onClick={goToLeaderboard}>
            <CodeIcon />
          </div>
        </div>
        <div className="header-input">
          <Search />
          <input type="text" placeholder="search question" />
        </div>

        <div className="header_rem">
          <span onClick={loggingOut}>
            <Avatar src={user?.photo} />
          </span>
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          </div>

          <Modal
            open={isModalOpen}
            closeIcon={<CloseIcon />}
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
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share link</h5>
            </div>

            <div className="modal__info">
              <Avatar className="avatar" />
              <div className="modal__scope">
                <PeopleAltOutlined />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc."
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: include a link that gives context"
                />

                {inputUrl !== "" && (
                  <img
                    src={inputUrl}
                    alt="image of url"
                    style={{
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            </div>

            <div className="modal__buttons">
              <button className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={submitQuestion} type="submit" className="add">
                Add Question
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default QuoraHeader;
