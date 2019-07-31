import express from 'express';
const router = express.Router();
import verifyToken from './verifyToken';
import User from '../model/User';

// BEFORE CONTINUE WITH THE HADDLER USE VERIFY TOKEN TO CHECK IF IS LOGGED
router.get('/', verifyToken, async (req, res) => {
    // res.send(req.user);
    // FIND AN USER BASE ON THIS TOKEN
    const user = await User.findOne({ id: req.body.id });
    res.send(user);
});

module.exports = router;