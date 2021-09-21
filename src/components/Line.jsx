import React from 'react';

export default class Line extends React.Component {
    // requires id_1 and id_2 of two other elements to initialize
    constructor(props) {
        super(props);
        
        this.initializeLineVariables();

        this.getStyle = this.getStyle.bind(this);
    }

    initializeLineVariables() { // initializes component variables
        this.id = "line-" + Math.floor(Math.random()*100000); // creating a random number between 0 and 100000 for element identifier

        var rects = this.getElementRects(this.props.id_1, this.props.id_2)

        if(rects === false) return false; // skips initialization if one element is null
        
        var lineEndpoints = this.getEndpoints(rects[1], rects[2]);

        this.x1 = Math.round(lineEndpoints.x1);
        this.y1 = Math.round(lineEndpoints.y1);
        this.rotation = this.getAngle(lineEndpoints);
        this.length = this.getLength(lineEndpoints);

        var thickness = this.props.thickness;

        if(thickness == null) {
            thickness = 2;
        }

        this.thickness = thickness;
    }

    // Updates global variable for future updating if element is null
    getElementRects(elementOneID, elementTwoID) {
        var elementOne = document.getElementById(elementOneID);
        var elementTwo = document.getElementById(elementTwoID);

        if(elementOne == null || elementTwo == null) {
            this.elementNull = true;
            return false;
        } else {
            this.elementNull = false;
            return [ elementOne.getBoundingClientRect(), elementTwo.getBoundingClientRect() ];;
        }
    }

    // gets the center cordinates of two rectangles, which are the two endpoints of the line
    getEndpoints(rect1, rect2) {
        var x1 = rect1.left+rect1.width/2;
        var y1 = rect1.top+rect1.height/2;

        var x2 = rect2.left+rect2.width/2;
        var y2 = rect2.top+rect2.height/2;

        var siteOffset = { x: window.scrollX, y: window.scrollY }

        return { 
            x1: x1+siteOffset.x, 
            y1: y1+siteOffset.y, 
            x2: x2+siteOffset.x, 
            y2: y2+siteOffset.y
        };
    }

    // uses Pythagorean theorem to estimate length, default params use coords what was already in the state
    getLength(coords) {
        return Math.round(Math.sqrt((coords.x1-coords.x2)*(coords.x1-coords.x2)+(coords.y1-coords.y2)*(coords.y1-coords.y2))); 
    }

    // gets angle in degrees from element 1 to element 2
    getAngle(coords) {
        return Math.round(Math.atan2(coords.y2-coords.y1, coords.x2-coords.x1)*180/Math.PI);
    }

    // calculates style of line
    getStyle() {
        var style = {
            position: "absolute",
            top: this.y1 + "px",
            left: this.x1 + "px",
            width: this.length + "px", 
            transformOrigin: '0px 0px',
            transform: "rotate(" + this.rotation + "deg)",
            borderColor: "white",
            borderTopStyle: "solid",
            borderTopWidth: this.thickness + "px"
        };

        console.log(style);

        return style;
    }

    render() {
        if(this.elementNull) {
            var result = this.initializeLineVariables()

            if(!result) return (<div></div>);
        }

        return (
            <div id = { this.id } style={this.getStyle()}></div>
        )
    }
}