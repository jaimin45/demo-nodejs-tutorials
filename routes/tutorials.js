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
router.get("/:Id", tutorialSearchById);
router.post("/", tutorialsCreate);
router.patch("/:Id", updateTutorials);
router.delete("/:Id", deleteTutorials);

module.exports = router;
