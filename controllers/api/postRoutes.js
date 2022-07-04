const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// post route to comment a post
router.post('/:id', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            post_id: req.params.id,
            user_id: req.session.user_id,
        });
    res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    };
});

// route for getting a specific post and associated comments
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk( req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text'],
                    include: [
                        {
                        model: User,
                        attributes:['username'],
                        }
                    ],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', { post, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    };
});

// delete route to delete post
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    };
});

// put route to update post
router.put('/:id', async (req, res) => {
    try {
      const update = await Post.update(
        {
          post_title: req.body.post_title,
          post_text: req.body.post_text,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!update) {
        res.status(404).json({message: "error"});
        return
      }
      res.status(200).json(update)

    } catch (err) {
      res.status(500).json(err)
    };
});
  

module.exports = router;