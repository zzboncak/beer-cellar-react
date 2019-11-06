import React from 'react';
import './beer.css';

class Beer extends React.Component {
    render() {
        return (
            <div className="beer-container">
                <h2 className="beer-name">{this.props.beer_name}</h2>
                <div className="info-flex">
                    <p>Quantity: <span className="beer-quantity">{this.props.quantity}</span></p>
                    <p>Untappd Rating: <span className="beer-rating">{this.props.rating}</span></p>
                </div>
                <p className="beer-description">{this.props.description}</p>
            </div>
        )
    }
}

export default Beer;