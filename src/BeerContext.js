import React from 'react';

const BeerContext = React.createContext({
    beers: [],
    fetchBeers: () => {},
});

export default BeerContext;