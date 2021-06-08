import './App.css';
import './components/Button.css';
import './components/Header.css';
import './components/Footer.css';
import './pages/Home.css';
import './components/Photoslider.css';
import './pages/Login.css'
import './pages/LostPassword.css'
import Header from './components/Header';
import backgroundtop from './assets/background_topcut.jpg';
import mtblogo from './assets/mtbrental.png';
import Footer from './components/Footer';
import background_footer from './assets/background_footer.jpg';
import Home from './pages/Home';
import Login from './pages/Login'
import LostPassword from "./pages/LostPassword";
import Photoslider from "./components/Photoslider";
import Registration from './pages/Registration'




function App() {
  return (
    <div className="App">
      <Header
      background={backgroundtop}
      mtblogo={mtblogo}
      />
        <Login/>
        <Home/>
        <LostPassword/>
        <Registration/>
      <Footer
          background_footer={background_footer}
      />

    </div>
  );
}

export default App;
