const router = require("express").Router();
const {
  getTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorialsControllers");

router.get("/", getTutorials);
router.get("/:id", getTutorialById);
router.post("/", createTutorial);
router.patch("/:id", updateTutorial);
router.delete("/:id", deleteTutorial);

module.exports = router;
