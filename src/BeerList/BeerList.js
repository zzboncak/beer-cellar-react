import React from 'react';
import { Link } from 'react-router-dom';
import BeerContext from '../BeerContext';
import Beer from '../Beer/beer';
import './BeerList.css';

class BeerList extends React.Component {
    static contextType = BeerContext;

    renderBeers = () => {
        return this.context.beers.map(beer => {
            return <Beer 
                        key = {beer.id}
                        id = {beer.id}
                        beer_name = {beer.beer_name}
                        quantity = {beer.quantity}
                        description = {beer.beer_description}
                        rating = {beer.untappd_rating}
                    />
        });
    }

    render() {
        const beers = this.renderBeers();
        return (
            <div className="beer-list">
                <h2 className="beers-list-header">My beers:</h2>
                {beers}
                <Link to='/' className="button-container">
                    <button className="back-button" id="back-button">Go back!</button>
                </Link>
            </div>
        );
    }
}

export default BeerList;