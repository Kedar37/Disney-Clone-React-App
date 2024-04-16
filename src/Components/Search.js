import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './search.css'

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  const searchData = async (searchQuery) => {
    const regex = new RegExp(searchQuery, 'i');
    const moviesCollection = collection(db, 'movies')
    const q = query(moviesCollection, where('fieldToSearch', '>=', searchQuery.toLowerCase()) +
    where('fieldToSearch', '<=', searchQuery.toLowerCase() + '\uf8ff'))
    const snapshot = await getDocs(q);
  
    const results = [];
    snapshot.forEach((doc) => {
        if (regex.test(doc.data().title)) {
            results.push({ id: doc.id, ...doc.data() });
          }
    });  
    return results;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() !== '') {
        const results = await searchData(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const clearSearchInput = () => {
    setSearchQuery('');
  };



  return (
    <div className='searchContainer' style={{top: '70px', position: 'relative'}}>
        <div className='search-bar'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="  Search movies..."
        >
        </input>
          <button className="clear" onClick={clearSearchInput}>
            X
          </button>
        </div>
        {searchResults.length > 0 ? (
            <Container>
                <Content>
                {searchResults.map(result=> (
                    <Wrap key={result.id}>
                        <Link to={`/details/${result.id}`}>
                        <img src={result.cardImg} alt={result.title} />
                        </Link>
                    </Wrap>
                    ))}
                </Content>
            </Container>
        ) : (
        <div style={{marginTop: '15px', textAlign: 'center'}}>
            <p>No results found.</p>
        </div>
        )}
    </div>
  );
};

const Container = styled.div`
top: 30px;
position: relative;
min-height: calc(100vh - 250px);
display: block;
padding: 0 calc(3.5vw + 5px);
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 26px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;



const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
    border-radius: 7px;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default SearchComponent;