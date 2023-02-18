import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import AddEvents from './components/AddEvents'
import TypeNavigation from './components/TypeNavigation';




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  console.log('here')
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(()=>setIsLoaded(true));
  }, [dispatch]);

  console.log(isLoaded)
  return (
  // return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route  path='/addevent'>
            <AddEvents />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/home'>
            <TypeNavigation />
          </Route>
        </Switch>
      )}

    </>
  );
}


export default App;
