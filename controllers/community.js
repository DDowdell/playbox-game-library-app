const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.render('community/index.ejs', {
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.send('User not found');
    }
    res.render('community/show.ejs', {
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:userId/:gameId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const game = currentUser.games.id(req.params.gameId);
    res.render('games/show.ejs', {
      game: game,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
