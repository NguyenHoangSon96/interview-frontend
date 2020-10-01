import * as React from 'react';
import {connect} from "react-redux";
import {useEffect} from "react";
import axios from 'axios';

import {GET_BOOKS_URL} from "../../actions/endpoints";
import {NOTIFY_TYPE_DANGER, RESPONSE_STATUS_FAIL} from "../../constant/commonConstant";
import {showNotification} from "../../utils/utils";


function Bookings(props) {

  useEffect( () => {
    axios.get(GET_BOOKS_URL, {withCredentials: true}).then(response => {
      console.log(response)

      if (response.data.status === RESPONSE_STATUS_FAIL) {
        showNotification(NOTIFY_TYPE_DANGER, 'Notification', response.data.message);
      }
    })
    .catch(e => {
      showNotification(NOTIFY_TYPE_DANGER, 'Notification', e.message);
    });
  }, []);

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
