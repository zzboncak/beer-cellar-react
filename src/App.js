import React from 'react';
import Beer from './Beer/beer';
import { Route, Link } from 'react-router-dom';
import './App.css';
import AddForm from './AddForm/AddForm';
import BeerList from './BeerList/BeerList';
import BeerContext from './BeerContext';
import NavButtons from './NavButtons/NavButtons';


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

  
  render () {
    const searchSection = this.renderSearchResults();
    const contextValue = {
      beers: this.state.beers,
    };
    
    return (
      <BeerContext.Provider value={contextValue}>
        <main className='App'>
          <h1 className='hero-header'>Cheers 🍺</h1>
          <Route path='/add-form' component={AddForm} />
          <Route path='/beer-list' component={BeerList} />
          <Route exact path='/' component={NavButtons} />
          <footer>
            <img src={'./src/Images/pbu_80_black.png'} />
          </footer>
        </main>
      </BeerContext.Provider>
    );
  }
}

export default App;
