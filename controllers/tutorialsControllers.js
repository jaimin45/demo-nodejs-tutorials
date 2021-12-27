const { CastError } = require("mongoose");
const Tutorial = require("../models/tutorials");

// get All Tutorials
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({
      createdAt: -1,
    });
    res.status(200).send(tutorials);
  } catch (error) {
    res.status(500).send({ message: "Tutorial not found" });
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
    await tutorial.save();
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
    const tutorial = await Tutorial.findByIdAndUpdate(
      { _id: req.params.id },
      update,
      {
        new: true,
      }
    );

    if (tutorial === null) {
      res.status(400).send({ message: "Invalid Tutorial Id" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ message: "Invalid Tutorial Id" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

// Delete a Tutorial by ID
const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);

    if (tutorial === null) {
      res.status(404).send({ message: "Not Found Tutorial" });
    } else {
      res.status(200).send();
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(404).send({ message: "Invalid Tutorial Id" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

// Able to search by Id
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (tutorial === null) {
      res.status(404).send({ message: "Not Found Tutorial" });
    } else {
      res.status(200).send();
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(404).send({ message: "Invalid Tutorial Id" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
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
