import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import Prices from './components/prices/prices';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/prices" element={<Prices />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
