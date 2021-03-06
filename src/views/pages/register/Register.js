import React, {useState} from 'react'
import {connect} from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
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
import validateRegisterAccount from "../../../validator/validateRegisterAccount";
import {REGISTER_URL} from "../../../actions/endpoints";
import axios from "axios";
import {
  RESPONSE_STATUS_FAIL, RESPONSE_STATUS_SUCCESS,
  NOTIFY_TYPE_DANGER, NOTIFY_TYPE_SUCCESS, COMMON_ERROR_TEXT
} from "../../../constant/commonConstant";
import {showNotification} from "../../../utils/utils";

function Register(props) {
  let [formInputs, setFormInputs] = useState({});
  let [validateInput, setValidateInput] = useState(undefined);

  const submitForm = async (e) => {
    const {username, email, password, repeatPassword} = formInputs;
    const validateresult = validateRegisterAccount(username, email, password, repeatPassword);
    setValidateInput(validateresult);
    if (validateresult) return

    try {
      const response = await axios.post(REGISTER_URL, {username, email, password});
      if (response.data.status === RESPONSE_STATUS_SUCCESS) {
        showNotification(NOTIFY_TYPE_SUCCESS, 'Notification', 'Register success', () => {
          props.history.push('/login')
        }, {dismiss: {duration: 1800}});
      } else {
        showNotification(NOTIFY_TYPE_DANGER, 'Notification', response.data.message);
      }
    } catch (e) {
      showNotification(NOTIFY_TYPE_DANGER, 'Notification', COMMON_ERROR_TEXT);
    }
    // TODO check username ngay khi type
  }

  const onInput = (e) => {
    const {name, value} = e.target;
    setFormInputs({...formInputs, [name]: value});
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">

                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="username" onInput={onInput} type="text" placeholder="Username" autoComplete="username" />
                    {validateInput && validateInput.userName && <div className="text-danger w-100">{validateInput.userName}</div>}
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="email" onInput={onInput} type="email" placeholder="Email" autoComplete="email" />
                    {validateInput && validateInput.email && <div className="text-danger w-100">{validateInput.email}</div>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="password" onInput={onInput} type="password" placeholder="Password"/>
                    {validateInput && validateInput.password && <div className="text-danger w-100">{validateInput.password}</div>}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="repeatPassword" onInput={onInput} type="password" placeholder="Repeat password" />
                    {validateInput && validateInput.repeatPassword && <div className="text-danger w-100">{validateInput.repeatPassword}</div>}
                  </CInputGroup>
                  <CButton onClick={submitForm} color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
              {/*<CCardFooter className="p-4">*/}
              {/*  <CRow>*/}
              {/*    <CCol xs="12" sm="6">*/}
              {/*      <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>*/}
              {/*    </CCol>*/}
              {/*    <CCol xs="12" sm="6">*/}
              {/*      <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>*/}
              {/*    </CCol>*/}
              {/*  </CRow>*/}
              {/*</CCardFooter>*/}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.userProfile,
  }
}

const mapDispatchToProps = dispatch => {return {}}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

