import express from 'express';
const router = express.Router();

router.get('/register', function (req, res) {
    res.send('Register successfully')
  })

module.exports = router;