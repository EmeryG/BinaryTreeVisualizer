import React from 'react';

// uses id_1 and id_2 of elements that line connects
export default class Line extends React.Component {
    constructor(props) {
        super(props);

        this.getStyle = this.getStyle.bind(this);
        this.toElementNull = true;
    }

    componentDidMount() {
        this.state = { x1: 0, y1: 0, rotation: 0, length: 0 };

        this.initializeLineVariables();

        this.interval = setInterval(() => this.calculateLineState(this.props), 250);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    initializeLineVariables() {
        this.id = "line-" + this.props.id_1 + "to" + this.props.id_2; // creating a random number between 0 and 100000 for element identifier

        let thickness = this.props.thickness;

        if(thickness == null) {
            thickness = 2;
        }

        this.thickness = thickness;

        this.calculateLineState(this.props);
    }

    calculateLineState(lineProps) {
        let rects = this.getElementRects(lineProps.id_1, lineProps.id_2);

        // skips calculation if one element is nonexistent
        if(rects === false) {
            this.toElementNull = true;
            return false;
        } else {
            this.toElementNull = false;
        }
        
        let lineEndpoints = this.getEndpoints(rects[0], rects[1]);

        var newState = {
            x1: Math.round(lineEndpoints.x1), 
            y1: Math.round(lineEndpoints.y1), 
            rotation: this.getAngle(lineEndpoints),
            length: this.getLength(lineEndpoints),
        };

        // checks if a rerender is necessary through changing state
        if(this.state.x1 != newState.x1 || this.state.y1 != newState.y1) {
            this.setState(newState);
        } else {
            console.log("state is equal");
        }
    }

    // Returns false if one element is null
    getElementRects(elementOneID, elementTwoID) {
        let elementOne = document.getElementById(elementOneID);
        let elementTwo = document.getElementById(elementTwoID);

        if(elementOne === null || elementTwo === null || elementOne === undefined || elementTwo === undefined) {
            return false;
        } else {
            return [ elementOne.getBoundingClientRect(), elementTwo.getBoundingClientRect() ];;
        }
    }

    getEndpoints(rect1, rect2) {
        let x1 = rect1.left+rect1.width/2;
        let y1 = rect1.top+rect1.height/2;

        let x2 = rect2.left+rect2.width/2;
        let y2 = rect2.top+rect2.height/2;

        let siteOffset = { x: window.scrollX, y: window.scrollY }

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

    getStyle(currentState) {
        let style = {
            position: "absolute",
            top: currentState.y1 + "px",
            left: currentState.x1 + "px",
            width: currentState.length + "px", 
            transformOrigin: '0px 0px',
            transform: "rotate(" + currentState.rotation + "deg)",
            borderColor: "white",
            borderTopStyle: "solid",
            borderTopWidth: this.thickness + "px"
        };

        return style;
    }

    render() {
        if(this.toElementNull) return (<div></div>);

        return (
            <div id = { this.id } style={ this.getStyle(this.state) }></div>
        )
    }
}