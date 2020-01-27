import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AddForm from './AddForm/AddForm';
import BeerList from './BeerList/BeerList';
import BeerContext from './BeerContext';
import NavButtons from './NavButtons/NavButtons';
import { SERVER_ENDPOINT } from './config';


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

  fetchBeers = () => {
    fetch(SERVER_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        this.setState({
          beers: data
        });
      });
  }

  componentDidMount() {
    this.fetchBeers();
  }
  
  render () {
    const contextValue = {
      beers: this.state.beers,
      fetchBeers: this.fetchBeers
    };
    
    return (
      <BeerContext.Provider value={contextValue}>
        <main className='App'>
          <h1 className='hero-header'>
            Cheers <span role='img' aria-label="beer icon">🍺</span>
          </h1>
          <Route path='/add-form' component={AddForm} />
          <Route path='/beer-list' component={BeerList} />
          <Route exact path='/' component={NavButtons} />
        </main>
      </BeerContext.Provider>
    );
  }
}

export default App;
