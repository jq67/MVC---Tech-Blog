const router = require('express').Router();
const { Post, User } = require('../../models');

// post route to create user
router.post('/', async (req,res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
    
          res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    };
});


// post route to login with email and password
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
  
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email, please try again' });
            return
        };
  
        const validPassword = userData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return
        };

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    };
});

// post route /logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

// post to user to create a post
router.post('/:id', async (req, res) => {
    try {
        const postData = await Post.create(req.body);

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/', async (req,res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: Post,
                    attributes: ['id']
                },
            ],
        });
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;