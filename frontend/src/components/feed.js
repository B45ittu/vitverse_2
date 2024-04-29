// Feed.js

import React, { useEffect, useState } from "react";
import Question from "./Question";
import Post from "./Post";
import "./feed.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectSearchText } from "../features/searchSlice";

function Feed() {
  const [posts, setPosts] = useState([]);
  const searchText = useSelector(selectSearchText);

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

  // Filter posts based on searchText
  const filteredPosts = posts.filter(post =>
    post.questionName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="feed">
      <Question />
      {filteredPosts.map((post, index) => (
        <Post key={index} post={post} setPosts={setPosts} />   
      ))}
    </div>
  );
}

export default Feed;
