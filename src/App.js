import React from 'react';
import Beer from './Beer/beer';
import './App.css';
import AddForm from './AddForm/AddForm';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        beers: [],
        searchedBeers: [],
        isAddFormVisible: false,
    };
  }

  toggleAddFormView = () => {
    let newState = !this.state.isAddFormVisible;
    this.setState({
      isAddFormVisible: newState
    });
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

  renderPage = () => {
    if(this.state.isAddFormVisible) {
      return (
        <AddForm 
          store={this.props.store} 
          updateSearchedBeers={this.updateSearchedBeers}
          toggleAddFormView={this.toggleAddFormView}
        />
      )
    } else {
      return (
        <section className="results-section">
          <button onClick={this.toggleAddFormView}>Search for a beer</button>
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
        </section>
      )
    }
  }
  
  render () {
    const searchSection = this.renderSearchResults();
    const page = this.renderPage();
    
    return (
      <main className='App'>
        {page}
        <footer>
          <img src='Images/pbu_80_black.png' />
        </footer>
      </main>
    );
  }
}

export default App;
