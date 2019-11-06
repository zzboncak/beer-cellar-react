import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            beer_name: '',
            quantity: 0,
            rating: 0,
            description: ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleBeerChange = this.handleBeerChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(key, value) {
        let currentState = this.state;
        currentState[key] = value;
        this.setState(currentState);
    }
    
    handleBeerChange(event) {
        this.handleChange("beer_name", event.target.value);
    }

    handleQuantityChange(event) {
        this.handleChange("quantity", event.target.value);
    }
    
    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        console.log(this.props.store);
        this.props.store.push(this.state);
        this.props.modifyState();
    }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Beer:
              <input type="text" value={this.state.beer_name} onChange={this.handleBeerChange} />
            </label>
            <label>
              Quantity:
              <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}

export default Form;