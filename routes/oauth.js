const router = require("express").Router();
const {
  loginUser,
  changePassword,
  otpSendEmail,
  forgetPassword,
} = require("../controllers/oauthController");

router.post("/token", loginUser);
router.patch("/reset-password", changePassword);
router.post("/forgot-password", otpSendEmail);
router.patch("/forgot-password", forgetPassword);

module.exports = router;
