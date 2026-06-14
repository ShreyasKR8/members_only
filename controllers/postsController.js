const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

const validateTitle = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ min: 1, max: 50 })
        .withMessage(`Title must be under 50 characters.`)
        .escape()
];

const validateContent = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Post content cannot be empty")
        .isLength({ min: 1, max: 150 })
        .withMessage(`Post content must be under 150 characters.`)
        .escape()
];

exports.getNewPost = async (req, res) => {
    res.render('posts/new-post')
}

exports.createPost = [validateTitle, validateContent,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("posts/new-post", {
                errors: errors.array(),
                data: req.body,
            });
        }

        const { title, content } = matchedData(req);
        const userId = req.user.id;

        await db.createPost(title, content, userId);

        res.redirect('/');
    }
];