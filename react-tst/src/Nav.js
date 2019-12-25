import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <h3>S&P Test</h3>
            <ul>
                <Link to="/">
                    <li>Github Users</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
