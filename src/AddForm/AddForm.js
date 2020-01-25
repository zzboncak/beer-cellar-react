import React from 'react';
import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from '../config';
import './AddForm.css';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            beer_name: '',
            quantity: 0,
            rating: 0,
            description: ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleBeerChange = this.handleBeerChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(key, value) {
      let currentState = this.state;
      currentState[key] = value;
      currentState["id"] = Math.random()*1000;
      this.setState(currentState);
    }
    
    handleBeerChange(event) {
      this.handleChange("beer_name", event.target.value);
    }

    handleQuantityChange(event) {
      this.handleChange("quantity", event.target.value);
    }

    searchBeer(beerName) {
      let beerSearchTerm = beerName.replace(/ /g, '+');
      return `https://api.untappd.com/v4/search/beer?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&q=${beerSearchTerm}&oauth_consumer_key=${REACT_APP_CLIENT_ID}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1579811282&oauth_nonce=NGTvfx803sS&oauth_version=1.0&oauth_signature=p6Fjfb3a/2Jn8pOPuWI25umZOHw='`
    }

    handleSubmit(event) {
      event.preventDefault();
      fetch(this.searchBeer(this.state.beer_name))
        .then(res => {
          if(!res.ok) {
            throw new Error('Failed to add new beer')
          }
          return res.json()
        })
        .then(data => {
          console.log('all data', data);
          console.log('beers', data.response.beers.items);
          //data.response.beers.items.forEach(instance => console.log(instance.beer.beer_name))
          this.props.updateSearchedBeers(data.response.beers.items);
        });
    }


    
    render() {
        return (
          <main className='search-form-container'>
            <form onSubmit={this.handleSubmit} className='search-form'>
              <label>
                Beer search:
                <input type="text" value={this.state.beer_name} onChange={this.handleBeerChange} />
              </label>
              <label>
                Quantity:
                <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} />
              </label>
              <input type="submit" value="Submit" />
              <button type='button' onClick={this.props.toggleAddFormView}>Go back</button>
            </form>
          </main>
        );
    }
}

export default AddForm;