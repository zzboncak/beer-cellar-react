import React from 'react';
import { Link } from 'react-router-dom';
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
            description: "",
            searchedBeers: [],
        };
    }
    
    handleBeerChange = (event) => {
      this.setState({
        beer_name: event.target.value
      })
    }

    searchBeer = (beerName) => {
      let beerSearchTerm = beerName.replace(/ /g, '+');
      return `https://api.untappd.com/v4/search/beer?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&q=${beerSearchTerm}&oauth_consumer_key=${REACT_APP_CLIENT_ID}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1579811282&oauth_nonce=NGTvfx803sS&oauth_version=1.0&oauth_signature=p6Fjfb3a/2Jn8pOPuWI25umZOHw='`
    }

    handleSubmit = (event) => {
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
          this.setState({
            searchedBeers: data.response.beers.items,
          });
        });
    }

    updateSearchedBeers = (resultsArray) => {
      this.setState({
        searchedBeers: resultsArray,
      });
    }

    renderSearchResults = () => {
      if(this.state.searchedBeers === []) {
        return <div>Nothing to see here...</div>
      } else {
        return this.state.searchedBeers.map((instance, i) => {
          return <div key={i}>
                  <h2>Untappd Beer Name: {instance.beer.beer_name}</h2>
                  <img src={instance.beer.beer_label} />
                  <p>Untappd Beer Id: {instance.beer.bid}</p>
                  <p>Untappd Brewery Id: {instance.brewery.brewery_id}</p>
                  <p>Untappd Description: {instance.beer.beer_description}</p>
                </div>
        })
      }
    }
    
    render() {
        const beerResults = this.renderSearchResults();

        return (
          <main className='search-form-container'>
            <form onSubmit={this.handleSubmit} className='search-form'>
              <label htmlFor="search-term">
                Beer search:
                <input name="search-term" type="text" value={this.state.beer_name} onChange={this.handleBeerChange} />
              </label>
              <br />
              <button type="submit" value="Submit">Submit</button>
              {' '}
              <Link to='/'><button>Go back</button></Link>
            </form>
            <section className="results-section">{beerResults}</section>
          </main>
        );
    }
}

export default AddForm;