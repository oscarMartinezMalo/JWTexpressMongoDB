import express from 'express';
const router = express.Router();
import User from '../model/User';
import validation from './validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

router.post('/register', async function (req, res) {
  // VALIDATE THE DATA BEFORE REGISTER A USER
  const { error } = validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF THE USER EXIST IN THE DATABASE
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) res.status(400).send('Email already exists');

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER WITH THE  HASHEDPASSWORD
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  // TRYING TO SAVE THE NEW USER
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser.id });
  } catch (error) {
    res.status(400).send(error);
  }

});

// LOGIN
router.post('/login', async function (req, res) {
  // VALIDATE THE DATA BEFORE LOGIN A USER
  const { error } = validation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF THE EMAIL EXIST IN THE DATABASE
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send('Email doesnt exists');

  // CHECK IF PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Invalid password')
  }
  else {
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  }

});

module.exports = router;