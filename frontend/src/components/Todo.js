// import React, { useState, useEffect } from 'react';
// import './todo.css';
// import mockProblems from '../assets/coding';
// import axios from 'axios';

// function Todo() {
//   const [selectedProblems, setSelectedProblems] = useState([]);

//   useEffect(() => {
//     const lastSelectedTime = localStorage.getItem('lastSelectedTime');
//     const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

//     // Check if 24 hours have passed since the last selection
//     if (!lastSelectedTime || Date.now() - lastSelectedTime > twentyFourHours) {
//       // Select three random problems
//       const shuffledProblems = shuffleArray(mockProblems); // Shuffle the array
//       const selected = shuffledProblems.slice(0, 3);
      
//       // Store the selected problems and current time in localStorage
//       setSelectedProblems(selected);
//       localStorage.setItem('lastSelectedProblems', JSON.stringify(selected));
//       localStorage.setItem('lastSelectedTime', Date.now());
//     } else {
//       // Use the previously selected problems
//       const storedSelectedProblems = JSON.parse(localStorage.getItem('lastSelectedProblems'));
//       setSelectedProblems(storedSelectedProblems);
//     }
//   }, []);

//   // Function to shuffle the array
//   const shuffleArray = array => {
//     const shuffled = array.slice();
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };
//   const [apiData, setApiData] = useState(null);

//   const fetchDataFromApi = async () => {
//     try {
//       const response = await axios.get('gh repo clone tejartr7/Leetcode-POTD-Direct-Link'); // Replace 'API_URL_HERE' with the actual API URL
//       setApiData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   return (
//     <section className="problems">
//       <h1>Coding Problems</h1>
//       <ul>
//         {selectedProblems.map((problem, index) => (
//           <li key={index}>
//             <h3>{problem.name}</h3>
//             <p>{problem.description}</p>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <button onClick={fetchDataFromApi}>Fetch Data from API</button>
//         {apiData && (
//           <div>
//             {/* Render the data from the API */}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Todo;
import React, { useState, useEffect } from 'react';
import './todo.css';
import mockProblems from '../assets/coding';

function Todo() {
  const [selectedProblems, setSelectedProblems] = useState([]);

  useEffect(() => {
    const lastSelectedTime = localStorage.getItem('lastSelectedTime');
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check if 24 hours have passed since the last selection
    if (!lastSelectedTime || Date.now() - lastSelectedTime > twentyFourHours) {
      // Select three random problems
      const shuffledProblems = shuffleArray(mockProblems); // Shuffle the array
      const selected = shuffledProblems.slice(0, 3);
      
      // Store the selected problems and current time in localStorage
      setSelectedProblems(selected);
      localStorage.setItem('lastSelectedProblems', JSON.stringify(selected));
      localStorage.setItem('lastSelectedTime', Date.now());
    } else {
      // Use the previously selected problems
      const storedSelectedProblems = JSON.parse(localStorage.getItem('lastSelectedProblems'));
      setSelectedProblems(storedSelectedProblems);
    }
  }, []);

  // Function to shuffle the array
  const shuffleArray = array => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <section className="problems">
      <h1>Coding Problems</h1>
      <ul>
        {selectedProblems.map((problem, index) => (
          <li key={index}>
            <h3>{problem.name}</h3>
            <p>{problem.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;