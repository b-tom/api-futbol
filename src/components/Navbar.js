import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
    return (
        <div className='mainContainer'>
            <Link to='/'>
                <img src='https://icon-library.com/images/house-icon-png/house-icon-png-8.jpg' alt='home' />
            </Link>            
        </div>
    )
}