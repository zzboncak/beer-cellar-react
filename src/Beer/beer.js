import React from 'react';
import './beer.css';
import BeerContext from '../BeerContext';

class Beer extends React.Component {
    
    static contextType = BeerContext;

    handleDelete = () => {
        let url = `http://localhost:8000/api/beers/${this.props.id}`;
        fetch(url, {
            method: 'delete'
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('Could not delete beer');
                }
                console.log(res)
                this.context.fetchBeers();
            })
            .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div className="beer-container">
                <h2 className="beer-name">{this.props.beer_name}</h2>
                <div className="info-flex">
                    <p>Quantity: <span className="beer-quantity">{this.props.quantity}</span></p>
                    <p>Untappd Rating: <span className="beer-rating">{this.props.rating}</span></p>
                </div>
                <p className="beer-description">{this.props.description}</p>
                <button id="remove-button" onClick={this.handleDelete}>Remove this beer from my cellar</button>
            </div>
        )
    }
}

export default Beer;