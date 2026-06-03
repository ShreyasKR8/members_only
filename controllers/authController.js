const pool = require('../db/pool');
const db = require('../db/queries');
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
    body("firstname").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 50 }).withMessage(`First name ${lengthErr}`),
    body("lastname").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 50 }).withMessage(`Last name ${lengthErr}`),
    body("username")
        .isLength({ min: 1, max: 50 })
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username may only contain letters, numbers and underscores'),
    body("email").trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password').isLength({ min: 5 })
        .withMessage(
            'Password must be at least 5 characters'
        ),
];

const validateEmailNotInUse = body('email').custom(async value => {
    const user = await db.findUserByEmail(value);
    if (user) {
        throw new Error('E-mail already in use');
    }
});

const passwordConfirmationValidator = body('confirmpassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    });

exports.registerGet = async (req, res) => {
    res.render('auth/register-form');
};

exports.registerPost = [
    validateUser,
    validateEmailNotInUse,
    passwordConfirmationValidator,

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (!errors.isEmpty()) {
                console.log(errors.array());

                return res.render('auth/register-form', {
                    errors: errors.array(),
                });
            }
        }

        next();
    },
    async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                10
            );

            await pool.query(
                `INSERT INTO users(first_name, last_name, username, 
                email, password_hash)
                VALUES($1, $2, $3, $4, $5)`,
                [req.body.firstname, req.body.lastname,
                req.body.username, req.body.email,
                    hashedPassword
                ]
            )
            res.redirect("/");
        } catch (err) {
            console.log(err);
        }
    }];