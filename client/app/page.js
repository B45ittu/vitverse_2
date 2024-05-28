"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import ThemeSwitch from "./switch";
import { useRouter } from "next/navigation";
import LeetCode from "leetcode-query";
// Define the Home component
export default function Home() {
  // Initialize state variables
  const [question, setQuestion] = useState(null);
  const router = useRouter();
  // Fetch data on component mount
  useEffect(() => {
    //console.log("Fetching question");
    const fetchQuestion = async () => {
      const { data } = await axios.get(
        "https://leetcode-potd-direct-link-djrs.vercel.app/"
      );
      console.log(data);
      setQuestion(data);
    };
    if (!question) fetchQuestion();
  }, [question]);

  useEffect(() => {
    if (question && question.link) {
      console.log("Redirecting to: ", "https://leetcode.com" + question.link);
      setTimeout(() => {
        const temp = "https://leetcode.com" + question.link;
        console.log(temp);
        router.push(temp);
      }, 3000);
    }
  }, [question]);

  // JSX returned by the component
  return (
    <div className="flex flex-col justify-center items-center h-screen m-auto p-auto">
      <div className="flex flex-col justify-center items-center h-screen m-auto p-auto">
        {question ? (
          <div className="flex flex-col justify-center items-center h-screen m-auto p-auto">
            <p className="text-3xl font-semibold">Redirecting...</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen m-auto p-auto">
            <h3 className="text-4xl font-semibold mb-4">
              A product by{" "}
              <a
                className="text-blue-500 hover:underline"
                href="https://twitter.com/raghu_rtr"
              >
                RTR
              </a>
            </h3>
            <p className="text-2xl">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
