const router = require("express").Router();
const { createUser, updateUser } = require("../controllers/userControllers");

router.post("/", createUser);
router.patch("/:id", updateUser);

module.exports = router;
