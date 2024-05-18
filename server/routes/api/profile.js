import { Router } from "express";
import auth from "../../middleware/auth.js";
import { check } from "express-validator";
import {
  addEducation,
  createProfile,
  deleteEducation,
  deleteExperience,
  getCurrentProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
  addExperience,
  getProfileByHandle,
} from "../../operations/profileop.js";

const router = Router();

//Get profile data
//Endpoint api/profile/me
router.get("/me", auth, async (req, res) => {
  getCurrentProfile(req, res);
});

//Post profile data
//Endpoint api/profile/
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    createProfile(req, res);
  }
);

// Get all profiles
// Endpoint api/profile/
router.get("/", async (req, res) => {
  getAllProfiles(req, res);
});

// Get profile by user id
// Endpoint api/profile/user/:user_id
router.get("/user/:user_id", async (req, res) => {
  getProfileById(req, res);
});

// Get profile by handle
// Endpoint  api/profile/handle/:handle
router.get("/handle/:handle", (req, res) => {
  getProfileByHandle(req, res);
});

// Delete profile, user and posts
// Endpoint api/profile/
router.delete("/", auth, async (req, res) => {
  deleteProfile(req, res);
});

// Update Experience
// Endpoint api/profile/experience
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    addExperience(req, res);
  }
);

// Delete Experience
// Endpoint api/profile/experience/:exp_id
router.delete("/experience/:exp_id", auth, async (req, res) => {
  deleteExperience(req, res);
});

// Update Education
// Endpoint api/profile/education
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    addEducation(req, res);
  }
);

// Delete Education
// Endpoint api/profile/education/:edu_id
router.delete("/education/:edu_id", auth, async (req, res) => {
  deleteEducation(req, res);
});

export default router;
