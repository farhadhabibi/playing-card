import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        let xPos = Math.random() * 90 - 40;
        let yPos = Math.random() * 40 - 20;
        let rotate = Math.random() * 40 - 20;
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${rotate}deg)`

    }

    render() {
        return (
            <div className="Card">
                <img style={{ transform: this._transform }} src={this.props.img} alt={this.props.alt} />
            </div>
        )
    }

}

export default Card