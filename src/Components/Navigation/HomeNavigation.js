import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../../Containers/Home/Home';
import Login from '../../Containers/Login/Login';

const HomeNavigation = () => {
  return (
    <Switch>
      <Route exact path='/'><Redirect to='/login'/></Route>
      <Route path='/login' component={Login}/>
      <PrivateRoute path='/home' component={Home}/>
    </Switch>
  );
};

export default HomeNavigation;