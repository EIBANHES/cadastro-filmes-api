const { Router } = require("express");

const UserController = require("../controllers/UserController")

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.create)
usersRoutes.get("/:user_id", userController.getUserById)
usersRoutes.put("/:user_id", userController.updateUser)

module.exports = usersRoutes;