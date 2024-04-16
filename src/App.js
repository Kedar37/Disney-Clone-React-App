import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Header from './Components/Header';
import Home from './Components/Home';
import Details from './Details';
import OriginalsPage from './OriginalsPage';
import Watchlist from './Watchlist';
import SearchComponent from './Components/Search';
import Movies from './movies';
import Series from './series';

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/details/:id" element={<Details />}/>
            <Route path="/originals" element={<OriginalsPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
