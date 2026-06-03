const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get('/register', authController.registerGet);

module.exports = authRouter;