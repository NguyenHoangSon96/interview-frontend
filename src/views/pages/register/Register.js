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
import {createAccount} from '../../../actions/userAction'
import validateRegisterAccount from "../../../validator/validateRegisterAccount";

const Register = (props) => {
  let [userName, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [validateInput, setValidateInput] = useState(undefined);

  const submitForm = (e) => {
    // console.log(userName);
    // console.log(email);
    console.log(password);
    console.log(repeatPassword);

    const validateresult = validateRegisterAccount(userName, email, password, repeatPassword);
    setValidateInput(validateresult);
    console.log(validateresult)
    if (validateresult) return

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
                    <CInput name="userName" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" autoComplete="username" />
                    {validateInput && validateInput.userName && <div className="text-danger w-100">{validateInput.userName}</div>}
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" />
                    {validateInput && validateInput.email && <div className="text-danger w-100">{validateInput.email}</div>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    {validateInput && validateInput.password && <div className="text-danger w-100">{validateInput.password}</div>}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput name="repeatPassword" onChange={(e) => setRepeatPassword(e.target.value)} type="password" placeholder="Repeat password" />
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

const mapDispatchToProps = dispatch => {
  return {
    createAccount: () => dispatch(createAccount()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

