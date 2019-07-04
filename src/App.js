import React from 'react';
import './App.css';
import {Navbar,Nav} from 'react-bootstrap';
import Main from './components/main';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="app-content">
      <header>
        <Navbar expand="lg" className="navbar">
          <Navbar.Brand className="nav-brand" >Rick and Morty</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse bsPrefix="navbar-collapse" id="basic-navbar-nav">
            <Nav className="nav-item-list">
              <Link to="/">Home</Link>
              <Link to="/characters">Characters</Link>
              <Link to="/locations">Locations</Link>
              <Link to="/episodes">Episodes</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <Main/>
      <footer>
        <p>Created by Andy Dang</p>
      </footer>
    </div>
  );
}

export default App;
