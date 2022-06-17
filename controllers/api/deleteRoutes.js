const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/:id', async (req, res) => {
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
    )

    if (!update) {
      res.status(404).json({message: "error"});
      return
    }

    res.status(200).json(update)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;