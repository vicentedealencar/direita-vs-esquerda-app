import React from 'react';
import logo from './logo.svg';
import './App.css';
import Battle from './components/Battle';

function App() {
  return (
    <>
      <header>
        <p>Direita VS Esquerda</p>
      </header>
      <section className="content">
        <Battle />
      </section>
      <footer>
        Powered by 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} className="react-logo" alt="logo" />
        </a>
      </footer>
    </>
  );
}

export default App;
