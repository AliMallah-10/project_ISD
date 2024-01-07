const express = require("express");
const router = express.Router();

// Import the users controller
const userController = require("../controllers/userController");
// const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
// const authorization = require("../middlewares/authorizationMiddleware");
// const refreshAuthToken = require("../middlewares/refreshAuthToken");

// Define routes for user-related operations
router.get("/", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.get("/username/:username", userController.getUserByUsername);
router.get("/getByNames/:names", userController.getUserByNames);
router.get("/doctors", userController.getAllDoctors);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
