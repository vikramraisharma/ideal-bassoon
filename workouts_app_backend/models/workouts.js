const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
    exercise: {type: String, required: true},
    description: {type: String, required: true}
})

module.exports = mongoose.model('Workout', workoutSchema)
