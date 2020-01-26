import React from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from '../config';
import './AddForm.css';
import BeerResult from '../BeerResult/BeerResult';

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
          return <BeerResult
                    key={i}          
                    beer_name={instance.beer.beer_name}
                    beer_label={instance.beer.beer_label}
                    bid={instance.beer.bid}
                    brewery_id={instance.brewery.brewery_id}
                    beer_description={instance.beer.beer_description}
                    history={this.props.history}
                  />
        })
      }
    }
    
    render() {
        const beerResults = this.renderSearchResults();

        return (
          <section className='search-form-container'>
            <form onSubmit={this.handleSubmit} className='search-form'>
              <fieldset className='search-form-fieldset'>
                <label htmlFor="search-term" className="search-term">
                  Beer search: {' '}
                  <input 
                    name="search-term" 
                    type="text" 
                    value={this.state.beer_name} 
                    onChange={this.handleBeerChange} 
                    placeholder='Bourbon County 2018'
                  />
                </label>
                <br />
                <button type="submit" value="Submit" id="submit-button">Submit</button>
                <br />
                {' '}
                <Link to='/'><button id="back-button">Go back</button></Link>
              </fieldset>
            </form>
            <section className="results-section">{beerResults}</section>
          </section>
        );
    }
}

export default AddForm;