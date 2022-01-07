const router = require("express").Router();
const { loginUser, changePassword } = require("../controllers/oauthController");

router.post("/token", loginUser);
router.patch("/reset-password", changePassword);

module.exports = router;
