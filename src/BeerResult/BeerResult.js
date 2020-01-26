import React from 'react';
import './BeerResult.css';
import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from '../config';
import BeerContext from '../BeerContext';

class BeerResult extends React.Component {

    static contextType = BeerContext;
    
    handleAdd = () => {
        let url = `https://api.untappd.com/v4/beer/info/${this.props.bid}?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&oauth_consumer_key=${REACT_APP_CLIENT_ID}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1579992866&oauth_nonce=TByLThvuO9o&oauth_version=1.0&oauth_signature=BRkl0JVJ3EyAii2EZhto+ptM63g=`;
        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw new Error(`Could not fetch beer details`);
                }
                return res.json()
            })
            .then(data => {
                //console.log(data.response.beer);
                let beer = data.response.beer;
                let newBeer = {
                    untappd_beer_id: beer.bid,
                    beer_name: beer.beer_name,
                    untappd_rating: beer.rating_score,
                    beer_description: beer.beer_description,
                    brewery_id: beer.brewery.brewery_id,
                    brewery_name: beer.brewery.brewery_name,
                    beer_image: beer.beer_label
                }
                //console.log(JSON.stringify(newBeer));
                return newBeer;
            })
            .then(beerToSend => {
                console.log('beer to send', JSON.stringify(beerToSend))
                fetch('http://localhost:8000/api/beers', {
                    method: 'post',
                    headers: { 'Content-Type': 'Application/JSON' },
                    body: JSON.stringify(beerToSend)
                })
                    .then(res => {
                        if(!res.ok) {
                            throw new Error('Could not post beer')
                        }
                        return res.json()
                    })
                    .then(data => {
                        console.log('returned data from server', data)
                        this.context.fetchBeers();
                        this.props.history.push('/beer-list');
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.context);
        return (
            <div className='beer-result'>
                <h3 className="beer-name">{this.props.beer_name}</h3>
                <img src={this.props.beer_label} alt={this.props.beer_name}/>
                <p>{this.props.bid}</p>
                <p>{this.props.beer_description}</p>
                <button onClick={this.handleAdd}>Add this beer</button>
            </div>
        )
    }
}

export default BeerResult;