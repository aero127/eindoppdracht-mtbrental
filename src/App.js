import './App.css';
import './components/Header.css';
import './components/Footer.css';
import './pages/Home.css';
import './components/Photoslider.css';
import './pages/Login.css';
import './pages/LostPassword.css';

import Header from './components/Header';
import backgroundtop from './assets/background_topcut.jpg';
import mtblogo from './assets/mtbrental.png';
import Footer from './components/Footer';
import background_footer from './assets/background_footer.jpg';
import Home from './pages/Home';
import Login from './pages/Login';
import LostPassword from "./pages/LostPassword";
import Registration from './pages/Registration';
import Mtb26Inch from './pages/bikes/MTB26Inch';
import Mtb29Inch from "./pages/bikes/MTB29Inch";
import Mtb26InchFS from "./pages/bikes/MTB26InchFS";
import Mtb29InchFS from "./pages/bikes/MTB29InchFS";
import Mtbkids from "./pages/bikes/MTBKids";
import MtbElectric from "./pages/bikes/MTBElectric";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Booking from "./pages/Booking";
import Profile from './pages/Profile';
import CheckBooking from "./pages/CheckBooking";
import SearchOnDate from "./adminpages/SearchOnDate"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';


function App() {
  return (
      <>

          <ScrollToTop/>
      <Header
      background={backgroundtop}
      mtblogo={mtblogo}
      />
          <Switch>
              <Route exact path='/zoeken-op-datum'>
                  <SearchOnDate/>
              </Route>
              <Route exact path='/checkbooking'>
                  <CheckBooking/>
              </Route>
              <Route exact path='/profile'>
                  <Profile/>
              </Route>
              <Route exact path="/booking">
              <Booking/>
              </Route>
              <Route exact path="/contact">
              <Contact/>
              </Route>
              <Route exact path="/login">
                  <Login/>
              </Route>
              <Route exact path="/lostpassword">
                  <LostPassword/>
              </Route>
              <Route exact path="/registration">
                  <Registration/>
              </Route>
              <Route exact path="/mtb26inch">
                  <Mtb26Inch/>
              </Route>
              <Route exact path="/mtb29inch">
                  <Mtb29Inch/>
              </Route>
              <Route exact path="/mtb29inchfs">
                  <Mtb29InchFS/>
              </Route>
              <Route exact path="/mtb26inchfs">
                  <Mtb26InchFS/>
              </Route>
              <Route exact path="/mtbelectric">
                  <MtbElectric/>
              </Route>
              <Route exact path="/mtbkids">
                  <Mtbkids/>
              </Route>
              <Route exact path="/location">
                  <Location/>
              </Route>
              <Route exact path="/">
                  <Home/>
              </Route>
         </Switch>
      <Footer
          background_footer={background_footer}
      />

      </>
  );
}

export default App;
