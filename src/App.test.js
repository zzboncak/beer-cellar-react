import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';

describe('App component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App store={store} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});