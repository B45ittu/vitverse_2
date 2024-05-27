import React, { useEffect, useState } from "react";
import Question from "./Question";
import Post from "./Post";
import "./feed.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectSearchText } from "../features/searchSlice";
import { selectSelectedCategory } from "../features/optionsSlice"; // Import the selector

function Feed() {
  const [posts, setPosts] = useState([]);
  const searchText = useSelector(selectSearchText);
  const selectedCategory = useSelector(selectSelectedCategory); // Get the selected category

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

  // Filter posts based on searchText and selectedCategory
  const filteredPosts = posts.filter(post => {
    const questionWords = post.questionName.toLowerCase().split(/\s+/); // Split question into words
    const matchesSearchText = searchText ? post.questionName.toLowerCase().includes(searchText.toLowerCase()) : true;
    const matchesCategory = selectedCategory 
      ? selectedCategory.toLowerCase().split(/\s+/).some(categoryWord =>
          questionWords.some(word => word.toLowerCase() === categoryWord.toLowerCase())
        )
      : true;
    return matchesSearchText && matchesCategory;
  });

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
