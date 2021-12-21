const router = require("express").Router();
const {
  tutorialsAll,
  tutorialSearchById,
  tutorialsCreate,
  updateTutorials,
  deleteTutorials,
} = require("../controllers/tutorialsControllers");

/* GET users listing. */
router.get("/", tutorialsAll);
router.get("/:tutorialId", tutorialSearchById);
router.post("/", tutorialsCreate);
router.put("/:tutorialId", updateTutorials);
router.delete("/:tutorialId", deleteTutorials);

module.exports = router;
