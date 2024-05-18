import { Router } from "express";
import { check } from "express-validator";
import { signup } from "../../operations/authop.js";

const router = Router();

// Registering a user
router.post(
  "/",
  [
    check("name", " Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    signup(req, res);
  }
);

export default router;
