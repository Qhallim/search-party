import express from "express";
import User from "../models/User.js";

const router = express.Router();

function isHunterEmail(email) {
  return (
    email.endsWith("@myhunter.cuny.edu") ||
    email.endsWith("@stu-mail.hunter.cuny.edu")
  );
}

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // 1. domain check
    if (!isHunterEmail(email)) {
      return res.status(403).json({ error: "Invalid Hunter email" });
    }

    // 2. check if user exists
    let userEmail = await User.findOne({ email });
    let userUsername = await User.findOne({ username });

    // 3. if user exists, we should not overwrite the user
    if (userEmail || userUsername) {

        return res.status(403).json({ error: "Username or Email Taken"});

    }

    let user = await User.create({ email, username, password });

    res.json(user);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { login, password } = req.body;
      const hashedPassword = password;
  
      // Find user by email OR username
      const user = await User.findOne({
        $or: [
          { email: login },
          { username: login }
        ]
      });
  
      if (!user) {
        return res.status(404).json({
          error: "User not found"
        });
      }
  
      // Check password
      if (user.password !== hashedPassword) {
        return res.status(401).json({
          error: "Incorrect password"
        });
      }
  
  
      // Send user info back
      res.json({
        username: user.username,
        email: user.email
      });
  
  
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  });

export default router;