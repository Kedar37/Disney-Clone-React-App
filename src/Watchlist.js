import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Watchlist() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const currentUser = auth.currentUser; // Assuming you have already set up authentication

  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (currentUser) {
        try {
          const watchlistRef = collection(db, 'Users', currentUser.uid, 'Watchlist');
          const querySnapshot = await getDocs(watchlistRef);
          const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
          setWatchlistMovies(movies);
        } catch (error) {
          console.error('Error fetching watchlist data:', error);
        }
      } else {
        // Handle the case where the user is not logged in
        console.log('User not logged in');
      }
    };
    fetchWatchlistData();
  }, [currentUser]);


  return (
    <Container>
        <Content>
        {watchlistMovies.map(movie=> (
              <Wrap key={movie.id}>
                <Link to={`/details/${movie.id}`}>
                  <img src={movie.cardImg} alt={movie.title} />
                </Link>
              </Wrap>
            ))}
        </Content>
    </Container>
  );
}

const Container = styled.div`
position: relative;
min-height: calc(100vh - 250px);
display: block;
top: 120px;
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
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
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
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Watchlist;