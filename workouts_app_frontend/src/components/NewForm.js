import React, { Component } from 'react'

class NewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercise: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value})
  }
  async handleSubmit (event) {
    event.preventDefault()
    try{
      let response = await fetch(this.props.baseURL + '/workouts', {
          method: 'POST',
          body: JSON.stringify({exercise: this.state.exercise, description: this.state.description}),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      let data = await response.json()
      this.props.handleAddExercise(data)
      this.setState({
        exercise: ''
      })
    } catch(e) {
      console.log({'Error': e});
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="exercise"></label>
        <input type="text" id="exercise" name="exercise" onChange={this.handleChange} value={this.state.exercise} placeholder="exercise"/>
        <label htmlFor="description"></label>
        <input type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} placeholder="description"/>
        <input type="submit" value="Save Workout"/>
      </form>
    )
  }
}

export default NewForm
