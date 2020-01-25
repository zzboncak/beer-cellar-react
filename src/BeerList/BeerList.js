import React from 'react';
import { Link } from 'react-router-dom';
import BeerContext from '../BeerContext';
import Beer from '../Beer/beer';

class BeerList extends React.Component {
    static contextType = BeerContext;

    renderBeers = () => {
        return this.context.beers.map(beer => {
            return <Beer 
                        key = {beer.id}
                        beer_name = {beer.beer_name}
                        quantity = {beer.quantity}
                        description = {beer.beer_description}
                        rating = {beer.untappd_rating}
                    />
        });
    }

    render() {
        console.log(this.context.beers);
        const beers = this.renderBeers();
        return (
            <div>
                {beers}
                <Link to='/'>
                    <button>Go back!</button>
                </Link>
            </div>
        );
    }
}

export default BeerList;