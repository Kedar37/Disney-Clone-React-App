import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { auth, provider, db } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore'

const Header = (props) => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        const userRef = doc(collection(db, 'Users'), user.uid);
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
    
        const watchlistRef = collection(userRef, 'Watchlist');
        await setDoc(doc(watchlistRef), { createdAt: serverTimestamp() });
    
        console.log('User document and watchlist subcollection created successfully!');
      } catch (error) {
        console.log('Error has occurred!', error);
      }
      navigate('/home')
    };


  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log("User has sign out");
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        // navigate('/home');
      } else {
        setUser(null);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  
    

  return (
    <Nav>
        <Logo>
            <img src='./images/logo.svg' alt='' />
        </Logo>

        {!user ? 
        (<Login onClick={handleGoogleLogin}>Login</Login>) 
        :
        (<>
            <NavMenu open={isMenuOpen}>
                <Link to={'/home'}>
                <img src="/images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
                </Link>
                <Link to={'/search'}>
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
                </Link>
                <Link to={'/watchlist'}>
                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>WATCHLIST</span>
                </Link>
                <Link to={'/originals'}>
                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
                </Link>
                <Link to={'/movies'}>
                <img src="/images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
                </Link>
                <Link to={'/series'}>
                <img src="/images/series-icon.svg" alt="SERIES" />
                <span>SERIES</span>
                </Link>
            </NavMenu>
            <BurgerMenu open={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div />
              <div />
              <div />
            </BurgerMenu>
            <SignOut>
              <UserImg src={user.photoURL} alt="profile-pic" />
              <Dropdown>
                <span onClick={handleSignOut}>Sign out</span>
              </Dropdown>
            </SignOut>
        </>)
        }
    </Nav>
  )
}

const BurgerMenu = styled.div`
  display: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 24px;
    width: 30px;
  }

  div {
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 5px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  position: relative;
  padding: 0px;
  margin: 0px;
  margin-right: auto;
  margin-left: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: #090b13;
    position: absolute;
    height: auto;
    top: 70px;
    left: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(-6%)' : 'translateX(-110%)')};
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
      margin-right: 5px;
    }

    span {
      color: white;
      font-size: 13px;
      letter-spacing: 1.5px;
      line-height: 1px;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: cyan;
        border-radius: 0px 0px 5px 5px;
        bottom: -10px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: center center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.45, 0.45, 0.95) 0s;
        visibility: hidden;
        width: auto;
      }

      @media (max-width: 768px) {
        padding: 20px 0px;
      } 
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  // @media (max-width: 768px) {
  //   padding: 12px;
  // } 
`;

const Login = styled.a`
font-weight: bold;
padding: 8px 16px;
letter-spacing: 1.5px;
text-transform: uppercase;
border: 1px solid white;
border-radius: 5px;
transition: all 0.3s ease;

&:hover{
    background-color: white;
    color: #040741;
}
`;

const UserImg = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
`;

const Dropdown = styled.div`
position: absolute;
top: 60px;
right: 0px;
background-color: black;
border: 1px solid grey;
border-radius: 5px;
padding: 10px;
font-size: 16px;
font-weight: 500;
letter-spacing: 2.5px;
width: 100px;
opacity: 0;
text-align: center;
`;

const SignOut = styled.div`
position: relative;
height: 60px;
width: 60px;
display: flex;
justify-content: center;
cursor: pointer;

&:hover{
  ${Dropdown} {
    opacity: 1;
    transition-duration: 1s;
  }
}
`;

export default Header