const router = require("express").Router();
const mongojs = require("mongojs");
const Exercise = require("../models/exercise.js");
const Workout = require("../models/workout.js");

// location.search = "?id=" + workout._id;
// const id = location.search.split("=")[1];

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// router.put("/api/workouts/:id", (req, res) => {
//     Workout.findOneAndUpdate({ _id: req.params.id} ,
//         {
//             $push: { exercises: req.body }
//         },
//         { new: true })
//         .then(dbExercise => {
//             res.json(dbExercise);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//             console.log(err)
//         });
// });

router.put("/api/workouts/:id", ({ body }, res) => {
    Exercise.create(body)
        .then(({ _id }, req) =>
            Workout.findOneAndUpdate({},
                {
                    $push: { exercises: _id }
                },
                {
                    upsert: true,
                    sort: { day: -1 },
                }))
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err)
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        // .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
        // .populate("exercises")
        .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;