const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json({ workouts });
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // sees if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout id" });
  }

  const workout = await Workout.findById(id);
  // workout doesnt exist
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  //found
  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  // add doc to db
  try {
    // pass in doc we want to create
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout

// update a workout

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
};
