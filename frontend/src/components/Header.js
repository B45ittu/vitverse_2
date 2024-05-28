import React, { useState } from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import "./Header.css";
import {
  AssignmentTurnedInOutlined,
  ExpandMore,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
} from "@mui/icons-material";
//import { FeaturedPlayList } from "@mui/icons-material";
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
import { setSearchText, selectSearchText } from "../features/searchSlice";
import { detectOffensiveLanguage } from "../algorithms/sensitivity";

function QuoraHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const searchText = useSelector(selectSearchText);

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  const submitQuestion = async () => {
    if (question !== "") {
      // Check for offensive language before submitting the question
      const isOffensive = detectOffensiveLanguage(question);
      if (isOffensive) {
        alert("Your question contains offensive language. Please revise it.");
        return;
      }

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

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToPeople = () => {
    navigate("/people");
  };
  const goToProfile = () => {
    navigate("/PeoplePage");
  };

  const gotoTodo=()=>{
    navigate("/Todo");
  };

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
          <div className="header-icon" onClick={goToHome}>
            <CottageIcon />
            <span className="icon-name">Home</span>
          </div>
          {/* <div className="header-icon">
            <FeaturedPlayList />
            <span className="icon-name">Playlists</span>
          </div> */}
          <div className="header-icon" onClick={gotoTodo}>
            <AssignmentTurnedInOutlined />
            <span className="icon-name">Code</span>
          </div>
          <div className="header-icon" onClick={goToPeople}>
            <PeopleAltOutlined />
            <span className="icon-name">People</span>
          </div>
          <div className="header-icon">
            <NotificationsOutlined />
            <span className="icon-name">Notifications</span>
          </div>
          <div className="header-icon" onClick={goToLeaderboard}>
            <CodeIcon />
            <span className="icon-name">Leaderboard</span>
          </div>
        </div>
        <div className="header-input">
          <Search />
          <input
            type="text"
            placeholder="search question"
            value={searchText}
            onChange={handleSearch}
          />
        </div>

        <div className="header_rem">
          {/* <span onClick={loggingOut}> */}
          <span onClick={goToProfile}>
            <Avatar src={user?.photo} />
          </span>
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          </div>
          <span onClick={loggingOut}>
          <Button>Log Out</Button>
          </span>

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
              <Avatar className="avatar" src={user?.photo}/>
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
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
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
