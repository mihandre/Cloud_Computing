import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './LogoutButton';

function MainPage() {

    const [searchText, setSearchText] = useState('');

    const handleChange = event => {
        setSearchText(event.target.value);

    console.log('value is:', event.target.value);
    }

    const handleClick = event => {
        event.preventDefault();
        console.log('handleClick 👉️', searchText);
    }

    return (
        <div id="MainPage">
            <nav className='text-right p-2'>
            <Logout></Logout>
            </nav>
            <h1 className='mt-10 text-blue-600'>Main Page</h1>
        <div className="flex-row">
        <span className="mr-6">Search:</span>
        <input class="border-4"
                type="text"
                id="searchText"
                name="searchText"
                onChange={handleChange}
                value={searchText}
                autoComplete="off"
            />
      <button className="ml-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Go!</button>

      
      </div>
        </div>
        
    )
}

export default MainPage;