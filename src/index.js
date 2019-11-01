const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const verifyToken = require("./verifyToken");

const app = express();
const JWT_SECRET = "alumno2019";

// Express middleware
app.use(cors());

// API endpoints
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

// Run server
app.listen(3000, () => console.log("API running on port 3000"));
