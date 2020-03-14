import React, { Component } from 'react'
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
      exercises: []
    }
    this.getExercises = this.getExercises.bind(this)
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
  render() {
    return (
      <div>
        <h1>Exercises</h1>
        <table>
          <tbody>
            { this.state.exercises.map(exercise => {
              return (
                  <tr key={exercise._id}>
                    <td id={exercise._id}>{exercise.exercise}</td>
                    <td id={exercise._id}>{exercise.description}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
