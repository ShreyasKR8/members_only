const { Router } = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");

const authRouter = Router();

authRouter.get('/register', authController.registerGet);
authRouter.post('/register', authController.registerPost);

authRouter.get('/login', authController.loginGet);
authRouter.post('/login',
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
    })
);

module.exports = authRouter;