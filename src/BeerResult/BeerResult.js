import React from 'react';
import './BeerResult.css';
import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, SERVER_ENDPOINT } from '../config';
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
                return newBeer;
            })
            .then(beerToSend => {
                fetch(SERVER_ENDPOINT, {
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
                        this.context.fetchBeers();
                        this.props.history.push('/beer-list');
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className='beer-result'>
                <h3 className="beer-name">{this.props.beer_name}</h3>
                <img src={this.props.beer_label} alt={this.props.beer_name}/>
                <p>{this.props.bid}</p>
                <p>{this.props.beer_description}</p>
                <button onClick={this.handleAdd} id="add-button">Add this beer</button>
            </div>
        )
    }
}

export default BeerResult;