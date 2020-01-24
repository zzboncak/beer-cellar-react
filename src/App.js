import React from 'react';
import Beer from './beer';
import './App.css';
import AddForm from './AddForm';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        beers: [],
        searchedBeers: []
    };
    // this.modifyState = this.modifyState.bind(this);
  }

  modifyState = () => {
    this.setState({
      value: this.state.value + 1,
    })
  }

  updateSearchedBeers = (resultsArray) => {
    this.setState({
      searchedBeers: resultsArray,
    });
  }

  componentDidMount() {
    let url = 'http://localhost:8000/api/beers';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          beers: data
        });
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
  
  render () {
    const searchSection = this.renderSearchResults();
    
    return (
      <main className='App'>
        <AddForm store={this.props.store} updateSearchedBeers={this.updateSearchedBeers}/>
        <section className="results-section">
          <h2>My Beers:</h2>
          <div className="results" id="results">
            {this.state.beers.map(beer => (
              <Beer 
                key = {beer.id}
                beer_name = {beer.beer_name}
                quantity = {beer.quantity}
                description = {beer.beer_description}
                rating = {beer.untappd_rating}
              />
            ))}
          </div>
          <div className="search-results">
            {searchSection}
          </div>
        </section>
          {/* content goes here */}
      </main>
    );
  }
}

export default App;
