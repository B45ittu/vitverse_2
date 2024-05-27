import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fetchUsers from '../fetchUsers';
import './peoplePage.css';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const fetchUserQuestionsAndAnswers = async (userEmail) => {
      try {
        const [questionsResponse, answersResponse] = await Promise.all([
          axios.get(`/api/questions?userEmail=${userEmail}`),
          axios.get(`/api/answers?userEmail=${userEmail}`)
        ]);

        setQuestions((prevQuestions) => ({
          ...prevQuestions,
          [userEmail]: questionsResponse.data || []
        }));

        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [userEmail]: answersResponse.data || []
        }));
      } catch (error) {
        console.error(`Error fetching data for user ${userEmail}:`, error);
      }
    };

    users.forEach(user => {
      fetchUserQuestionsAndAnswers(user.email); // Pass user's email to fetch questions and answers
    });
  }, [users]);

  return (
    <div className="people-container">
      <h1 className="people-title">Your profile</h1>
      <ul className="people-list">
        {users.map((user, index) => (
          <li key={index} className="user-item">
            <img src={user.photoURL} alt={user.displayName} className="user-photo" />
            <div>
              <p className="name">{user.displayName}</p>
              <p>{user.email}</p>
              <div className="questions-container">
                <h2>Questions Asked</h2>
                <ul>
                  {Array.isArray(questions[user.email]) && questions[user.email].map((question, qIndex) => (
                    <li key={qIndex} className="question-item">
                      <p>{question.questionName}</p>
                      {question.questionUrl && (
                        <a href={question.questionUrl} target="_blank" rel="noopener noreferrer">
                          {question.questionUrl}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="answers-container">
                <h2>Answers Given</h2>
                <ul>
                  {Array.isArray(answers[user.email]) && answers[user.email].map((answer, aIndex) => (
                    <li key={aIndex} className="answer-item">
                      <p>{answer.answerText}</p>
                      <p>Question: {answer.questionName}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
