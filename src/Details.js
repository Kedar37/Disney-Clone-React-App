import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { db, auth } from './firebase'
import { getDoc, doc, setDoc } from 'firebase/firestore'


const Details = () => {

    const { id } = useParams();

    const [details, setDetails] = useState(null)

    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchMovieData = async () => {
          try {
            const docRef = doc(db, 'movies', id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              setDetails(docSnap.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching movie data:', error);
          }
        };
    
        fetchMovieData();
      }, [id]);


      const handleAddToWatchlist = async () => {
        if (currentUser) {
          try {
            const watchlistRef = doc(db, 'Users', currentUser.uid, 'Watchlist', id);
            await setDoc(watchlistRef, details);
            // You can add a success message or notification here
          } catch (error) {
            console.error('Error adding to watchlist:', error);
            // You can add an error message or notification here
          }
        } else {
          // Handle the case where the user is not logged in
          console.log('User not logged in');
        }
      };


    return ( 
        <Container>
        { details ? (
          <>
              <Background>
                  <img src={details.backgroundImg} alt={details.title}/>
              </Background>
              <TitleImg>
                  <img src={details.titleImg} alt={details.title}/>
              </TitleImg>
              <Content>
                  <Controls>
                      <Player>Play</Player>
                      <Trailer>Trailer</Trailer>
                      <Addlist onClick={handleAddToWatchlist}>
                        <img src='/Images/watchlist-icon.svg' alt='watchlisticon'/>
                      </Addlist>
                      <GroupWatch><img src='/Images/group-icon.png' alt=''/></GroupWatch>
                  </Controls>
                  <Subtitle>{details.subtitle}</Subtitle>
                  <Description>{details.description}</Description>
              </Content>
            </>
        ) : (<p>Loading...</p>)}
      </Container>
      )
    }
    
    const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
    `;
    
    const Background = styled.div`
    position: fixed;
    opacity: 0.8;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
    
    img{
        width: 100vw;
        height: 100vh;
    
        @media (max-width: 768px) {
            width: initial;
        }
    }
    `;
    
    const TitleImg = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    -webkit-box-pack: start;
    margin: 0px auto;
    width: 100%;
    height: 30vw;
    min-height: 170px;
    padding-bottom: 24px;
    
      img {
        max-width: 600px;
        min-width: 200px;
        width: 35vw;
      }
    `;
    
    const Content = styled.div`
    max-width: 900px;
    `;
    
    const Controls = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    margin: 25px 0px;
    min-height: 55px;
    `;
    
    const Player = styled.button`
    height: 55px;
    font-size: 16px;
    font-weight: bold;
    margin: 0px 20px 0px 0px;
    padding: 20px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    border: 1px solid white;
    text-transform: uppercase;
    background: rgb(0, 0, 0, 0.3);
    
    &:hover{
      background: rgb(0, 0, 0, 0.6);
    }
    
    @media (max-width: 768px) {
        height: 45px;
        font-size: 12px;
        margin: 0px 10px 0px 0px;
    }
    `;
    
    const Trailer = styled(Player)``;
    
    
    const Addlist = styled.button`
    width: 55px;
    height: 55px;
    border-radius: 5px;
    margin: 0px 20px 0px 0px;
    cursor: pointer;
    border: 1px solid white;
    background: rgb(0, 0, 0, 0.3);
    
    &:hover{
      background: rgb(0, 0, 0, 0.6);
    }

    img{
      width: 35px;
      height: 35px;
      object-fit: cover;
    }
    
    @media (max-width: 768px) {
        height: 45px;
        width: 45px;
        margin: 0px 10px 0px 0px;
    }
    `;
    
    const GroupWatch = styled(Addlist)` `;
    
    const Subtitle = styled.div`
      color: rgb(249, 249, 249);
      font-size: 16px;
      min-height: 20px;
    
      @media (max-width: 768px) {
        font-size: 12px;
      }
    `;
    
    const Description = styled.div`
      line-height: 1.4;
      font-size: 20px;
      padding: 16px 0px;
      color: rgb(249, 249, 249);
    
      @media (max-width: 768px) {
        font-size: 14px;
      }
    `;
    
    export default Details;
    