import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';


// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Pages
import HomePage from './pages/Home';
import MainPage from './pages/Main';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import DetailPage from './pages/Detail';
import RegisterNowPage from './pages/RegisterNow';
import CategoryPage from './pages/CategoryPage';
import FormEditing from './pages/FormEditing';
import CategoryList from './pages/CategoryList';
import ProfilePage from './pages/Profile';
import DeclineFormsPage from './pages/DecilneForm';
import UserSignUpPage from './pages/UserSignUp';
import UserLoginPage from './pages/UserLogin';
import DashboardPage from './pages/Dashboard';


// Components
import Protected from './component/Protected';
import AppLayout from './component/AppLayout';
import AppLayoutSec from './component/AppLayoutSec';
import EventPage from './pages/EventsPage';
import ManageEventPage from './pages/ManageEvents';
import { useFirebase } from './context/Firebase';





function App() {

  // const location = useLocation();
  // const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.setItem("lastVisitedRoute", location.pathname);
  //   }
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   }
  // }, [location.pathname])

  // useEffect(() => {
  //   const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");

  //   if (lastVisitedRoute) {
  //     const navigated = async () => {
  //       await navigate(lastVisitedRoute);
  //       localStorage.removeItem("lastVisitedRoute");
  //     }
  //     navigated();
  //   }
  // }, [navigate])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={AppLayoutSec} >
            {
              !firebase.isLoggedIn ?
                (
                  <>
                    <Route path='/signup' Component={RegisterPage} key={14} />
                    <Route path='/login' Component={LoginPage} key={16} />
                  </>
                )
                : null
            }
            <Route path='/' Component={MainPage} key={1} />
            <Route path='/details/:id' Component={DetailPage} key={2} />
            <Route path='/registrationform' Component={RegisterNowPage} key={3} />
            <Route path='/events' Component={EventPage} key={4} />
            <Route path='/*' Component={MainPage} key={5} />
          </Route>

          {
            firebase.isLoggedIn ?
              <Route path='/' Component={AppLayout}>
                <Route path='/dashboard' Component={DashboardPage} key={6} />
                <Route path='/home' Component={HomePage} key={7} />
                <Route path='/category' Component={CategoryPage} key={8} />
                <Route path='/category/:category' Component={CategoryList} key={9} />
                <Route path='/formediting' Component={FormEditing} key={10} />
                <Route path='/profile/:userID' Component={ProfilePage} key={11} />
                <Route path='/declineforms' Component={DeclineFormsPage} key={12} />
                <Route path='/manageevents' Component={ManageEventPage} key={13} />
              </Route>
              : null
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
