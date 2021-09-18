import React from 'react';

export default class Line extends React.Component {
    // requires id_1 and id_2 of two other elements to initialize
    constructor(props) {
        super(props);
        this.state = {};

        this.id = "line-" + Math.floor(Math.random()*100000); // creating a random number between 0 and 100000 for element identifier
        
        this.initializeLineState(props.id_1, props.id_2);

        this.getStyle = this.getStyle.bind(this);
    }

    initializeLineState(elementOneID, elementTwoID) {
        var elementOne = document.getElementById(elementOneID);
        var elementTwo = document.getElementById(elementTwoID);

        var lineCoords = this.getLineCoords(elementOne.getBoundingClientRect(), elementTwo.getBoundingClientRect());

        console.log(lineCoords)
        this.setState(lineCoords);

        // default params use coords were previously entered
        console.log(this.getLength(lineCoords));

        this.setState({ rotate: this.getAngle(lineCoords), length: this.getLength(lineCoords)} );

        var thickness = this.props.thickness;

        if(thickness == null) {
            thickness = 2;
        }

        this.setState({ thickness: thickness });
    }

    // gets the center cordinates of two rectangles
    getLineCoords(rect1, rect2) {
        var x1 = rect1.left+rect1.width/2;
        var y1 = rect1.bottom+rect1.height/2;

        var x2 = rect2.left+rect2.width/2;
        var y2 = rect2.bottom+rect2.height/2;

        var siteOffset = { x: window.scrollX, y: window.scrollY }

        return { x1: x1-siteOffset.x, y1: y1-siteOffset.y, x2: x2-siteOffset.x, y2: y2-siteOffset.y};
    }

    // uses Pythagorean theorem to estimate length, default params use coords what was already in the state
    getLength(coords) {
        return Math.round(Math.sqrt((coords.x1-coords.x2)*(coords.x1-coords.x2)+(coords.y1-coords.y2)*(coords.y1-coords.y2))); // sqrt((x1-x2)*2+(y1+y2)*2)
    }

    // gets angle in degrees from element 1 to element 2
    getAngle(coords) {
        return Math.round(Math.atan2(coords.y2-coords.y1, coords.x2-coords.x1)*180/Math.PI);
    }

    getStyle() {
        return ({
            width: this.state.length + "px", 
            height: this.state.thickness, 
            transform: this.state.rotate + "deg",
            backgroundColor: "white"
        })
    }

    render() {
        return (
            <div id = { this.id } style={this.getStyle()} x1={this.state.x1} x2={this.state.x2} y1={this.state.y1} y2={this.state.y2}></div>
        )
    }
}