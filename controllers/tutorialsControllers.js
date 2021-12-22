const Tutorial = require("../models/tutorials");

// get All Tutorials
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({
      createdAt: -1,
    });
    res.status(200).send(tutorials);
  } catch (error) {
    res.status(404).send({ message: "Tutorial not found" });
  }
};

// Add new Tutorials
const createTutorial = async (req, res) => {
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  });
  try {
    const savedTutorial = await tutorial.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Update a Tutorial by ID
const updateTutorial = async (req, res) => {
  try {
    const { title, description, published } = req.body;
    const update = {};
    if (typeof title !== "undefined") update.title = title;
    if (typeof description !== "undefined") update.description = description;
    if (typeof published !== "undefined") update.published = published;
    const tutorialUpdate = await Tutorial.findByIdAndUpdate(
      { _id: req.params.id },
      update,
      { new: true }
    );
    res.status(201).send();
  } catch (error) {
    res.status(400).send({ message: "Invalid Tutorial Id" });
  }
};

// Delete a Tutorial by ID
const deleteTutorial = async (req, res) => {
  try {
    const tutorialRemove = await Tutorial.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ message: "Invalid Tutorial Id" });
  }
};

// Able to search by Id
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(404).send({ message: "Tutorial not found" });
  }
};

module.exports = {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getTutorialById,
};
