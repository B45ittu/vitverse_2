const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());

const fetchData = async (username) => {
  const url = 'https://leetcode.com/graphql';
  const query = {
    query: `{
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
    }`
  };

  try {
    const response = await axios.post(url, query, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const { data } = response.data;

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
};

app.post('/api/leetcode/fetch', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const data = await fetchData(username);

  if (data) {
    const filePath = path.join(__dirname, 'leetcodeData.json');

    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      let jsonData = {};

      try {
        jsonData = JSON.parse(content);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }

      jsonData[username] = data;

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.json({ message: 'Data fetched and stored successfully', data });
      });
    });
  } else {
    res.status(404).json({ error: 'No data found for the provided username' });
  }
});

app.get('/api/leetcode/data/:username', (req, res) => {
  const { username } = req.params;
  const filePath = path.join(__dirname, 'leetcodeData.json');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let jsonData = {};

    try {
      jsonData = JSON.parse(content);
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }

    if (jsonData[username]) {
      res.json(jsonData[username]);
    } else {
      res.status(404).json({ error: 'No data found for the provided username' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
