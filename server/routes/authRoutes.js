import express from 'express';
import { createUser, getCurrentUser, loginUser, updateLocation } from '../controllers/user.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import verifyJwt from '../middlewares/jwt.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/update-location', verifyJwt, updateLocation);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { _id: req.user._id, username: req.user.username, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

router.get('/current-user', verifyJwt, getCurrentUser );

export default router;