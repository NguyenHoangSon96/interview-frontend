import * as React from 'react';
import {connect} from "react-redux";
import {useEffect} from "react";


function Bookings(props) {

  useEffect(() => {
    console.log( props.user.name)
  })

  return (
    <div>
      <h1>Hello {props.user.name}</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.userProfile,
  }
}

export default connect(mapStateToProps)(Bookings);
