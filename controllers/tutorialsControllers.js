const { CastError } = require("mongoose");
const Tutorial = require("../models/tutorials");
const { postTutorialSchema } = require("../validations/tutorials.validations");
const logger = require("../config/winston");

// get All Tutorials
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({
      createdAt: -1,
    });
    res.status(200).send(tutorials);
    logger.tutorialLogger.log("info", "Get All Tutorials");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    logger.tutorialLogger.log("error", "Internal Server Error");
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
    const { error } = postTutorialSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    await postTutorialSchema.validateAsync(req.body);
    await tutorial.save();
    res.status(201).send();
    logger.tutorialLogger.log("info", "New Tutorial created");
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ message: "Invalid Tutorial Details" });
      logger.tutorialLogger.log("error", "Invalid Tutorial details ");
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      logger.tutorialLogger.log("error", "Internal Server Error");
    }
  }
  return null;
};

// Update a Tutorial by ID
const updateTutorial = async (req, res) => {
  try {
    const { error, value } = postTutorialSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const tutorial = await Tutorial.findByIdAndUpdate(
      { _id: req.params.id },
      value
    );
    if (tutorial === null) {
      res.status(404).send({ message: "Tutorial not found" });
      logger.tutorialLogger.log("error", "Tutorial not found");
    } else {
      res.status(204).send();
      logger.tutorialLogger.log("info", "Tutorial updated");
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(404).send({ message: "Tutorial not found" });
      logger.tutorialLogger.log("error", "Tutorial not found");
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      logger.tutorialLogger.log("error", "Internal Server Error");
    }
  }
  return null;
};

// Delete a Tutorial by ID
const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);

    if (tutorial === null) {
      res.status(404).send({ message: "Not Found Tutorial" });
      logger.tutorialLogger.log("error", "Tutorial not found");
    } else {
      res.status(200).send();
      logger.tutorialLogger.log("info", "Tutorial Deleted");
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(404).send({ message: "Tutorial not found" });
      logger.tutorialLogger.log("error", "Tutorial not found");
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      logger.tutorialLogger.log("error", "Internal Server Error");
    }
  }
};

// Able to search by Id
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (tutorial === null) {
      res.status(404).send({ message: "Not Found Tutorial" });
      logger.tutorialLogger.log("error", "Tutorial not found");
    } else {
      res.status(200).send();
      logger.tutorialLogger.log("info", "Tutorial get by Id");
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(404).send({ message: "Invalid Tutorial Id" });
      logger.tutorialLogger.log("error", "Tutorial not found");
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      logger.tutorialLogger.log("error", "Internal Server Error");
    }
  }
};

module.exports = {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getTutorialById,
};
