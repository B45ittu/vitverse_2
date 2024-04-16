import React, { useState } from "react";
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

function QuoraHeader() {
  const [isModalOpen, SetisModalOpen] = useState(false);
  const [inputurl, setinputurl] = useState("");
  const close = <CloseIcon />;
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
            <CottageIcon />
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
        </div>
        <div className="header-input">
          <Search />
          <input type="text" placeholder="search question" />
        </div>

        <div className="header_rem">
          <Avatar />
        </div>
        <div>
          <Button
            onClick={() => {
              SetisModalOpen(true);
            }}
          >
            Add Question
          </Button>
        </div>




        <Modal
          open={isModalOpen}
          closeIcon={close}
          onClose={() => SetisModalOpen(false)}
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
              type=" text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type="text"
                value={inputurl}
                onChange={(e) => setinputurl(e.target.value)}
                style={{
                  margin: "5px 0",
                  border: "1px solid lightgray",
                  padding: "10px",
                  outline: "2px solid #000",
                }}
                placeholder="Optional: inclue a link that gives context"
              />
              {inputurl !== "" && <img src={inputurl} alt="image of url" 
                style={{
                    height:"auto",
                    objectFit:"contain"
                }}
              />}
            </div>
          </div>

          <div className="modal__buttons">
            <button className="cancel" onClick={() => SetisModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="add">
              Add Question
            </button>
          </div>
        </Modal>




      </div>
    </div>
  );
}

export default QuoraHeader;
