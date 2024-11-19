import './App.css';
import NavBar from './components/NavBar';
import { Banner } from './components/Banner';
import { Element } from 'react-scroll';
import { Preloader } from './components/Preloader';

function App() {
  return (

    <>
    <Preloader />

    <div className="App">
      {/* Home Section */}
      <Element name="home" className="section">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="content-container">
          <Banner />
        </div>
      </Element>

      {/* About Section */}
      <Element name="about" className="section">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="content-container">
          <h1>About</h1>
        </div>
      </Element>

      {/* Projects Section */}
      <Element name="projects" className="section">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="content-container">
          <h1>Projects</h1>
        </div>
      </Element>

      {/* Book Online Section */}
      <Element name="book-online" className="section">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="content-container">
          <h1>Book Online</h1>
        </div>
      </Element>
    </div>
    </>
  );
}

export default App;
