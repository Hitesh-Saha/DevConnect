const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');


//Get profile data
//Endpoint api/profile/me
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for the user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Post profile data
//Endpoint api/profile/
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Getting data from req.body
    const {
      company,
      website,
      location,
      bio,
      status,
      githublink,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githublink) profileFields.githublink = githublink;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //update profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      //create new profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all profiles
// Endpoint api/profile/
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'] );
    res.json(profiles)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error")
  }
}
);

// Get profile by user id
// Endpoint api/profile/user/:user_id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'] );

    if(!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    
    res.json(profile);

  } catch (error) {
    console.log(error.message);

    if(error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(500).send("Server Error")
  }
}
);

// Delete profile, user and posts
// Endpoint api/profile/
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({msg: 'user deleted'})
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error")
  }
}
);

// Update Experience
// Endpoint api/profile/experience
router.put('/experience', [
  auth,
    [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title, company, location, from, to, current, description} = req.body;

    const newExperience = {title, company, location, from, to, current, description}

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExperience)
      await profile.save()
      res.json(profile)

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error")
    }
  }
);

// Delete Experience
// Endpoint api/profile/experience/:exp_id
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex,1)

    await profile.save()
    res.json(profile)

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error")
  }
}
);

// Update Education
// Endpoint api/profile/education
router.put('/education', [
  auth,
    [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {school, degree, fieldofstudy, from, to, current, description} = req.body;

    const newEducation = {school, degree, fieldofstudy, from, to, current, description}

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEducation)
      await profile.save()
      res.json(profile)

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error")
    }
  }
);

// Delete Education
// Endpoint api/profile/education/:edu_id
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    
    const removeIndex = profile.education.map(edu => edu.id).indexOf(req.params.edu_id)
    profile.education.splice(removeIndex,1)

    await profile.save()
    res.json(profile)

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error")
  }
}
);
module.exports = router;
