import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {LOGIN_URL} from "../../../actions/endpoints";
import axios from "axios";
import {connect} from "react-redux";
import {RESPONSE_STATUS_SUCCESS, NOTIFY_TYPE_DANGER} from "../../../constant/commonConstant";
import {SET_USER_PROFILE} from "../../../actions/actionType";
import {showNotification} from "../../../utils/utils";
import firebase from "../../../utils/firebase/auth";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const userFirebase = await firebase.auth().signInWithEmailAndPassword(email, password);
      const response = await axios.post(LOGIN_URL, {idToken: userFirebase.user.getIdToken(), email, password}, {withCredentials: true});
      if (response.data?.status === RESPONSE_STATUS_SUCCESS) {
        props.setUserProfile(response.data?.data);
        if (props.from) {
          alert(props.from)
          props.history.push(props.from);
        } else {
          props.history.push('/dashboard');
        }
      }
    } catch (e) {
      showNotification(NOTIFY_TYPE_DANGER, 'Notification', e.message);
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={login} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

function mapStateToProps(){return{}}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (data) => dispatch({type: SET_USER_PROFILE, data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
