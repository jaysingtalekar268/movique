import { useEffect, useState } from 'react';
import './App.css';
import { Container, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Movie from './components/movie/movie';


function App() {
  const [searchResult,setSData]= useState("");
    const [searchPage,setSPage]= useState("");
  useEffect(()=>{
    // alert("app"+searchPage);
  },[searchPage]);
  return (
    <Container className='app' fluid={true}>
      <Navbar setSRData={setSData} searchPage={searchPage}></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home searchData={searchResult} setSPage={setSPage}></Home>}></Route>
          <Route path="/movie" element={<Movie></Movie>}></Route>
          <Route path="/*" element={<Movie></Movie>}></Route>
        </Routes>
      </BrowserRouter>
      {/* {searchResult? console.warn(searchResult):""} */}

    </Container>
  );
}

export default App;
