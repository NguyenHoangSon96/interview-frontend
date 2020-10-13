import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import Dashboard from "../views/dashboard/Dashboard";
import PrivateRoute from "../views/authen/PrivateRoute";
import Users from "../views/users/Users";
import Youtube from "../views/youtube/Youtube";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <PrivateRoute path="/users" component={Users}/>
            <PrivateRoute path="/youtube" component={Youtube}/>
            {/*{routes.map((route, idx) => {*/}
            {/*  return route.component && (*/}
            {/*    <Route*/}
            {/*      key={idx}*/}
            {/*      path={route.path}*/}
            {/*      exact={route.exact}*/}
            {/*      name={route.name}*/}
            {/*      render={props => (*/}
            {/*        <CFade>*/}
            {/*          <route.component {...props} />*/}
            {/*        </CFade>*/}
            {/*      )} />*/}
            {/*  )*/}
            {/*})}*/}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
