import React from 'react';
import { Link } from 'react-router-dom';
import './NavButtons.css';

class NavButtons extends React.Component {
    render() {
        return (
            <section className="nav-buttons">
                <Link to='/add-form'><button>Search for a beer</button></Link>
                {' '}
                <Link to='/beer-list'>
                <button>See my cellar</button>
                </Link>
            </section>
        )
    }
}

export default NavButtons;