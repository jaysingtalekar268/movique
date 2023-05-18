import logo from './logo.svg';
import './App.css';
import { Container, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Movie from './components/movie/movie';


function App() {
  return (
    <Container fluid={true}>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/movie" element={<Movie></Movie>}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
