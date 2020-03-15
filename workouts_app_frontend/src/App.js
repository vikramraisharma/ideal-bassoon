import React, { Component } from 'react'
import NewForm from './components/NewForm.js'
import Show from './components/Show.js'
let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
      exercise: {}
    }
    this.getExercises = this.getExercises.bind(this)
    this.handleAddExercise = this.handleAddExercise.bind(this)
    this.deleteExercise = this.deleteExercise.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
  }

  componentDidMount() {
    this.getExercises()
  }

  async getExercises() {
    try {
      let response = await fetch(`${baseURL}/workouts`)
      let data = await response.json()
      this.setState({exercises: data})
    } catch (e) {
      console.error(e)
    }
  }

  handleAddExercise(exercise) {
    const copyExercises = [exercise, ...this.state.exercise]
    this.setState({
      exercise: copyExercises
    })
  }

  async deleteExercise(id) {
    try {
      let response = await fetch(`${baseURL}/workouts/${id}`, {
        method: 'DELETE'
      })
      let data = await response.json()
      const foundExercise = this.state.exercises.findIndex(exercise => exercise._id === id)
      const copyExercises = [...this.state.exercises]
      copyExercises.splice(foundExercise, 1)
      this.setState({exercises: copyExercises})
    } catch(e) {
      console.log(e);
    }
  }

  //show function
  getExercise(exercise){
      this.setState({exercise: exercise})
  }

  //update function
   async toggleComplete(exercise){
      // console.log(exercise)
      try{
          let response = await fetch(baseURL + '/workouts/' + exercise._id, {
              method: 'PUT',
              body: JSON.stringify({completed: !exercise.completed}),
              headers:{
                  'Content-Type': 'application/json'
              }
          })
          let updatedExercise = await response.json()
          const foundExercise = this.state.exercises.findIndex(foundItem => foundItem._id === exercise._id)
          const copyExercises = [...this.state.exercises]
          copyExercises[foundExercise].completed = updatedExercise.completed
          // console.log(updatedExercise)
          this.setState({exercises: copyExercises})
      }catch(e){
          console.error(e)
      }
  }

  render() {
    return (
      <div>
        <h1>Exercises</h1>
        <NewForm handleAddExercise={this.handleAddExercise} baseURL={baseURL}/>
        <table>
          <tbody>
            { this.state.exercises.map(exercise => {
              return (
                  <tr key={exercise._id} onMouseOver={()=> this.getExercise(exercise)}>
                    <td
                    id={exercise._id}
                    onClick={()=> {this.toggleComplete(exercise)}}
                    >{exercise.exercise}</td>
                    <td id={exercise._id}>{exercise.description}</td>
                    <td onClick={() => this.deleteExercise(exercise._id)}>X</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {/*Enter code to show the SHOW div for a particular exercise*/}
        {
            this.state.exercise
            ? <Show exercise={this.state.exercise}/>
            : null
        }
      </div>
    )
  }
}

export default App
