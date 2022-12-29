import React,{useEffect} from 'react'
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from "./Home";
import Navigation from './Navigation';
import setAuthToken from './utils/setAuthToken';
import store from "./store";
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import CreateProfile from './components/Profile/CreateProfile';
import ViewProfile from './components/Profile/ViewProfile';
import DisplayAllUsers from './components/Profile/DisplayAllUsers';
import SingleProfile from './components/Profile/SingleProfile';
import WriteLetter from './components/Letters/WriteLetter';
import SentLetters from './components/Letters/SentLetters';
import ReceivedLetters from './components/Letters/ReceivedLetters';
if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect( ()=>{
    store.dispatch(loadUser());
  },[])
  return (
    <>
      <Provider store={store}>
      <Router>
     <Navigation/>
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/signin" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/create-profile" element={<CreateProfile/>}/>
        <Route exact path="/profile" element={<ViewProfile/>}/>
        <Route exact path="/all-profiles" element={<DisplayAllUsers/>}/>
        <Route exact path="/profile/view/:id" element={<SingleProfile/>}/>
        <Route exact path="/write-letter/:id" element={<WriteLetter/>}/>
        <Route exact path="/sentLetters" element={<SentLetters/>}/>
        <Route exact path="/receivedLetters" element={<ReceivedLetters/>}/>
      </Routes>
    </Router>
      </Provider> 
    
    </>
  )
}

export default App