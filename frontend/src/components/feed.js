import React, { useEffect, useState } from "react";
import Question from "./question";
import Post from "./Post";
import "./feed.css";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="feed">
      <Question />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

export default Feed;
