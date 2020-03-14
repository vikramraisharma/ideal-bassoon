//dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
PORT = 3003

//middleware
app.use(express.json())

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed CORS'))
        }
    }
}
app.use(cors(corsOptions))

//mongoose
mongoose.connection.on('error', err => console.log(err.message + 'is Mongod not running?'))
mongoose.connection.on('disconnected', () => {
    console.log('mongo disconnected');
})
mongoose.connect('mongodb://localhost:27017/workouts', { useUnifiedTopology: true, useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
})

//controllers and routes
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

const workoutsController = require ('./controllers/workouts.js')
app.use('/workouts', workoutsController)

//listener
app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
})
