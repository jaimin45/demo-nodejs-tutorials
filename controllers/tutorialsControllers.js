const Tutorial = require("../models/tutorials");

// get All Tutorials
const tutorialsAll = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({
      createdAt: -1,
    });
    res.json(tutorials);
  } catch (error) {
    res.json({ message: error });
  }
};

// Add new Tutorials
const tutorialsCreate = async (req, res) => {
  const tutorial = new Tutorial({
    published: req.body.published,
  });
  try {
    const savedTutorial = await tutorial.save();
    res.send(savedTutorial);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a Tutorial by ID
const updateTutorials = async (req, res) => {
  try {
    const { update } = req.body;
    const { options } = { new: true };
    const tutorialUpdate = await Tutorial.findByIdAndUpdate(
      { _id: req.params.tutorialId },
      { published: req.body.published },
      update,
      options
    );
    res.json(tutorialUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Tutorial by ID
const deleteTutorials = async (req, res) => {
  try {
    const tutorialRemove = await Tutorial.findByIdAndDelete(
      req.params.tutorialId
    );
    res.json(tutorialRemove);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Able to search by Id
const tutorialSearchById = async (req, res) => {
  try {
    const tutorials = await Tutorial.findById(req.params.tutorialId);
    res.json(tutorials);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  tutorialsAll,
  tutorialsCreate,
  updateTutorials,
  deleteTutorials,
  tutorialSearchById,
};
