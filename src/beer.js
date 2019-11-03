import React from 'react';
import './beer.css';

function Beer(props) {
    return (
        <div className="beer-container">
            <h2 className="beer-name">{props.beer_name}</h2>
            <p>Quantity: <span className="beer-quantity">{props.quantity}</span></p>
            <p className="beer-description">{props.description}</p>
        </div>
    )
}

export default Beer;