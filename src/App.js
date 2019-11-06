import React from 'react';
import Beer from './beer';
import './App.css';
import Form from './form';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
    };
    this.modifyState = this.modifyState.bind(this);
  }

  modifyState() {
    this.setState({
      value: this.state.value + 1,
    })
  }
  
  render () {
    return (
      <main className='App'>
        <Form store={this.props.store} modifyState={this.modifyState}/>
        <section className="results-section">
          <h2>My Beers:</h2>
          <div className="results" id="results">
            {this.props.store.map(beer => (
              <Beer 
                key = {beer.id}
                beer_name = {beer.beer_name}
                quantity = {beer.quantity}
                description = {beer.description}
                rating = {beer.rating}
              />
            ))}
          </div>
        </section>
          {/* content goes here */}
      </main>
    );
  }
}

export default App;
