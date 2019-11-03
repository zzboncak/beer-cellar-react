import React from 'react';
import Beer from './beer';
import './App.css';

function App(props) {
  console.log(props);
  return (
    <main className='App'>
      <section className="results-section">
        <h2>My Beers:</h2>
        <div className="results" id="results">
          {props.store.map(beer => (
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

export default App;
