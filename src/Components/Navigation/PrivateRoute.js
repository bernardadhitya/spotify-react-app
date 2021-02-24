import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const isLogin = () => {
  return true;
}

const renderAuthorizedComponent = (AuthorizedComponent, props) => {
  return (
    <div className='component-wrapper'>
      <AuthorizedComponent {...props}/>
    </div>
  );
};

const PrivateRoute = ({component: AuthorizedComponent, ...parentProps}) => {
  return (
    <Route
      {...parentProps}
      render={(props) => (
        isLogin()
          ? (
            <>
              {renderAuthorizedComponent(AuthorizedComponent, props)}
            </>
          )
          : <Redirect to='/'/>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any
};

export default PrivateRoute;