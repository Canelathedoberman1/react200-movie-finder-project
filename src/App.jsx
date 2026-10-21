
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
