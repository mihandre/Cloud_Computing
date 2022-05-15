import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Logout from './LogoutButton';
import { ReactDOM } from 'react';

function MainPage() {

    let resultsData;
    const [movieDetails, setMovieDetails] = useState('');

    const [searchText, setSearchText] = useState('');

    const handleChange = event => {
        setSearchText(event.target.value);
    }

    const handleClick = async event => {
        event.preventDefault();
        if(searchText) {
            const params = {
            query: searchText,
            limit: 1
        }
        let response;
        await axios.post(
            `${process.env.REACT_APP_API_URL}/search`,
            params
        ).then(res => response = res.data);
        console.log(response);
        resultsData = response.itemListElement[0].result;
        console.log(resultsData);

        if(resultsData["@type"].includes("Movie")) {
            setMovieDetails(resultsData.detailedDescription.articleBody)
        } else {
            setMovieDetails("No movie found!");
        }
    }
        
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
      <button className="ml-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
      onClick={handleClick}>Go!</button>

      
      </div>
      <div>
          {movieDetails}
      </div>
        </div>
        
    )
}

export default MainPage;