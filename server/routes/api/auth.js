import { Router } from'express';
import auth from'../../middleware/auth.js';
import { check } from 'express-validator';
import { getAuth, login } from '../../operations/authop.js';

const router = Router();

router.get('/', auth, async (req, res) => {
    getAuth(req,res);
});

router.post(
    '/',
    [
        check('email','Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      login(req,res);
    }
  );

export default router;