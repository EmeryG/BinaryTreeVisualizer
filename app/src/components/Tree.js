import React from 'react'

export default class Tree extends React.Component {
    constructor(props) {
        super(props)
        this.state = { buttonMessage : "Start"}

        this.startAnimation = this.startAnimation.bind(this)
    }
    

    startAnimation() {
        if (this.state.buttonMessage == "Start") {
            this.state.buttonMessage = "Randomize"
            this.forceUpdate()
        } else {

        }
    }


    render() {
        return (
            <button onClick={this.startAnimation}>
                { this.state.buttonMessage }
            </button>
        )
    }
}