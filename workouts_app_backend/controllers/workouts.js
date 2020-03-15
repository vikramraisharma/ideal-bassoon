const workouts = require('express').Router()
const Workout = require('../models/workouts.js')

//index
workouts.get('/', (req, res) => {
    Workout.find({}, (err, foundWorkouts) => {
        if(err){
            res.status(400).json({error: err.message})
        }
        res.status(200).send(foundWorkouts)
    })
})

//create
workouts.post('/', async (req, res) => {
    Workout.create(req.body, (error, createdWorkout) => {
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).send(createdWorkout)
    })
})

//update
workouts.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedWorkout) => {
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).json(updatedWorkout)
    })
})

//delete
workouts.delete('/:id', (req, res) => {
    Workout.findByIdAndRemove(req.params.id, (error, deletedWorkout) => {
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).json(deletedWorkout)
    })
})

module.exports = workouts
