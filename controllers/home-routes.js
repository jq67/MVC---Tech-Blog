const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// renders all posts on homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, logged_in: req.session.logged_in, user_id : req.session.user_id });
  } catch (err) {
    res.status(500).json(err)
  }
});

// route to get users profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true
    });
    // res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
});


// login link
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
})

// signup link
router.get('/signup', async (req,res) => {
  try {
  res.render('signup', { logged_in: false });
  } catch (err) {
    res.status(500).json(err)
  }
})





module.exports = router;