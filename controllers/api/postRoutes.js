const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// post route to comment post
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
    }
})



router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id,
        {
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

        // res.status(500).json(post)

        res.render('post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
})

// post route to delete post

module.exports = router;