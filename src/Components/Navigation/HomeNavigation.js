import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../../Containers/Home/Home';

const HomeNavigation = () => {
  return (
    <Switch>
      <Route exact path='/'><Redirect to='/home'/></Route>
      <PrivateRoute path='/home' component={Home}/>
    </Switch>
  );
};

export default HomeNavigation;