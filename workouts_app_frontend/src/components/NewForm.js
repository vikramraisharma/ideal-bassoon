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
        <div className="row">
          <div className="twelve columns">
            <label htmlFor="exercise">
            <input className="u-full-width" type="text" id="exercise" name="exercise" onChange={this.handleChange} value={this.state.exercise} placeholder="exercise"/>
            </label>
          </div>
          <div className="twelve columns">
            <label htmlFor="description">
            <input className="u-full-width" type="text" id="description" name="description" onChange={this.handleChange} value={this.state.description} placeholder="description"/>
            </label>
          </div>
          <input className="button-primary" type="submit" value="Save Workout"/>
        </div>
      </form>
    )
  }
}

export default NewForm
