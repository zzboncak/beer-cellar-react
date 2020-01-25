import React from 'react';
import ReactDOM from 'react-dom';
import AddForm from './AddForm';

describe('Form component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
