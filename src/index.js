const { readFileSync } = require("fs");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");
const verifyToken = require("./verifyToken");

const app = express();
const JWT_SECRET = "alumno2019";
const GH_OAUTH_CLIENT_ID = "CLIENT_ID";
const GH_OAUTH_SECRET_ID = readFileSync(
  __dirname + "/GithubOauthClientSecret.secret"
);

// Express middleware
app.use(cors());
app.use(express.static(__dirname + "/public"));

// API routes
app.get("/api", (req, res) => res.json({ message: "My message" }));

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    name: "pepito",
    email: "pepito@gmail.com"
  };

  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "20s" });
  res.json({ token });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "Post created", authData });
    }
  });
});

app.get("/oauth/redirect", (req, res) => {
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${GH_OAUTH_CLIENT_ID}&client_secret=${GH_OAUTH_SECRET_ID}&code=${requestToken}`,
    headers: { accept: "application/json" }
  }).then(response => {
    const accessToken = response.data.access_token;
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
});

// Run server
app.listen(3000, () => console.log("API running on port 3000"));
