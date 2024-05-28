// // const fetch = require('node-fetch');
// // async function getAllUsernames() {

// //   return ["Preeti_Desai07","gayatri_d12","Prasanna_Fuse","ayushdongardive","snehal_elkiwar"];
// // }
       
// async function fetchData(username) {
//   const url = 'https://leetcode.com/graphql';
//   const query = `{
//     matchedUser(username: "${username}") {
//       username
//       submitStats: submitStatsGlobal {
//         acSubmissionNum {
//           difficulty
//           count
//           submissions
//         }
//       }
//     }
//   }`;

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query }),
//     });

//     const responseData = await response.json();
//     const { data } = responseData;

//     if (data && data.matchedUser) {
//       return data.matchedUser;
//     } else {
//       console.log("No data found for the provided username:", username);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching data for username", username, ":", error);
//     return null;
//   }
// }

// async function fetchLeaderboardData() {
//   const usernames = await getAllUsernames(); // Assuming getAllUsernames is defined elsewhere
//   const userDataPromises = usernames.map(username => fetchData(username));
//   const userData = await Promise.all(userDataPromises);

//   // Sort user data based on the total count of correct submissions (descending order)
//   userData.sort((a, b) => {
//     const correctSubmissionsA = a.submitStats.acSubmissionNum
//       .filter(stats => stats.difficulty === "Easy" || stats.difficulty === "Medium" || stats.difficulty === "Hard")
//       .reduce((total, stats) => total + stats.count, 0);
//     const correctSubmissionsB = b.submitStats.acSubmissionNum
//       .filter(stats => stats.difficulty === "Easy" || stats.difficulty === "Medium" || stats.difficulty === "Hard")
//       .reduce((total, stats) => total + stats.count, 0);
//     return correctSubmissionsB - correctSubmissionsA; // Sort in descending order
//   });

//   // printLeaderboard(userData); // Print leaderboard to console
//   return userData;
// }

// // function printLeaderboard(userData) {
// //   // console.log("Leaderboard:");
// //   userData.forEach((user, index) => {
// //     const correctSubmissions = user.submitStats.acSubmissionNum
// //       .filter(stats => stats.difficulty === "Easy" || stats.difficulty === "Medium" || stats.difficulty === "Hard")
// //       .reduce((total, stats) => total + stats.count, 0);
// //     // console.log(`${index + 1}. ${user.username} - Total Correct Submissions: ${correctSubmissions}`);
// //   });
// // }
// fetchLeaderboardData();

// module.exports = { fetchLeaderboardData };
async function fetchData(username) {
  const url = 'https://leetcode.com/graphql';
  const query = `{
    matchedUser(username: "${username}") {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();
    const { data } = responseData;

    if (data && data.matchedUser) {
      return data.matchedUser;
    } else {
      console.log("No data found for the provided username:", username);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data for username", username, ":", error);
    return null;
  }
}

async function fetchUserStats(username) {
  const userData = await fetchData(username);

  if (userData) {
    const stats = {
      easy: 0,
      medium: 0,
      hard: 0
    };

    userData.submitStats.acSubmissionNum.forEach(submission => {
      if (submission.difficulty === "Easy") {
        stats.easy += submission.count;
      } else if (submission.difficulty === "Medium") {
        stats.medium += submission.count;
      } else if (submission.difficulty === "Hard") {
        stats.hard += submission.count;
      }
    });

    return stats;
  } else {
    return null;
  }
}

module.exports = { fetchUserStats };
