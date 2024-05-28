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