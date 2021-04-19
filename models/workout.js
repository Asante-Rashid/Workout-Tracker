const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exersise"
    }
  ],
  totalDuration: Number
});

workoutSchema.methods.setTotalDuration = function(acc, exercises) {
  this.totalDuration = (acc.totalDuration || 0) + exercises.duration;

  return this.totalDuration;
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;