import logo from './boulanger_logo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Comming soon...
        </p>
        <a
          className="App-link"
          href="https://www.instagram.com/boulanger_patissiere/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our Instagram
        </a>
      </header>
    </div>
  );
}

export default App;
