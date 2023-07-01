import React, { Component } from 'react'

export class LifeCycle extends Component {
      constructor(){
            super()
            this.state = {
                  count: 0
            }
            console.log('constructor called')
      }
  render() {
        console.log('render called')
    return (
      <div>
            <h3>LifeCycle methods</h3>
            <p>count:{this.state.count}</p>
            <button onClick = {() => this.setState({
                  count: this.state.count + 1
            })}>
                  Increment
            </button>
      </div>
    )
  }
}

export default LifeCycle;