import React, {Component} from 'react'

class Show extends Component{
    render(){
        return(
            <>
                <div className="show">
                    <h3>Exercise Info:</h3>
                    <hr/>
                    <h4> {this.props.exercise.exercise} </h4>
                    <h4> Completed? <br/>
                    {this.props.exercise.completed
                        ? 'Completed!'
                        : 'Not completed yet...'
                    } </h4>
                    <h6><span> Description: </span></h6> <p>{this.props.exercise.description}</p>
                </div>
            </>
        )
    }
}

export default Show
