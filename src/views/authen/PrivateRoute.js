import * as React from 'react';
import Cookies from 'js-cookie';

import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";


function PrivateRoute({component: Component, userProfile, ...rest}) {
  return (
    <Route {...rest} render={props => {
      return (
        userProfile && Cookies.get('authenticated') ? <Component {...props}/> : <Redirect to={{pathname: '/login', state: {from: props.location} }}/>
      )
     }
    }/>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.user.userProfile,
  }
}

function mapDispatchToProps(dispatch) {return {}}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
