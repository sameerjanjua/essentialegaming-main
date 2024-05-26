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
import ComingDetailPage from './pages/ComingEventDetail';
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
import LiveCard from './component/Cards/LiveCard';
import LiveEventsPage from './pages/LiveEvents';
import PastEventDetailPage from './pages/PastEventDetails';





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
                    <Route path='/signup' Component={RegisterPage} />
                    <Route path='/login' Component={LoginPage} />
                  </>
                )
                : null
            }
            <Route path='/' Component={MainPage} />
            <Route path='/coming-event-details/:id' Component={ComingDetailPage} />
            <Route path='/past-event-details/:id' Component={PastEventDetailPage} />
            <Route path='/registrationform' Component={RegisterNowPage} />
            <Route path='/events' Component={EventPage} />
            <Route path='/events/live-events' Component={LiveEventsPage} />
            <Route path='/*' Component={MainPage} />
          </Route>

          {
            firebase.isLoggedIn ?
              <Route path='/' Component={AppLayout}>
                <Route path='/dashboard' Component={DashboardPage} />
                <Route path='/home' Component={HomePage} />
                <Route path='/category' Component={CategoryPage} />
                <Route path='/category/:category' Component={CategoryList} />
                <Route path='/formediting' Component={FormEditing} />
                <Route path='/profile/:userID' Component={ProfilePage} />
                <Route path='/declineforms' Component={DeclineFormsPage} />
                <Route path='/manageevents' Component={ManageEventPage} />
              </Route>
              : null
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
