import React, {
    lazy,
    Suspense,
    Fragment
  } from 'react';
  import {
    Switch,
    Redirect,
    Route,
    useHistory,
  } from 'react-router-dom';
  import MainLayout from 'layouts/MainLayout/index';
  
  import LoadingScreen from 'components/LoadingScreen';

  import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';


  const routesConfig = [
    {
      exact: true,
      path: '/',
      component: () => <Redirect to="/login" />
    },
    {
      exact: true,
      path: '/login',
      component: lazy(() => import('views/auth/LoginView'))
    },
    {
      exact: true,
      path: '/login/callback',
      component: LoginCallback // needs to be updated in okta profile to direct back to localhost://3000
    },
    // All routes which need the dashbaordLayout
    {
      path: '/',
      protected: true,
      layout: MainLayout,
      routes: [
        {
          exact: true,
          path: '/',
          component: () => <Redirect to="/dashboard" />
        },
        {
          exact: true,
          path: '/dashboard',
          component: lazy(() => import('views/dashboardView'))
        },
      ]
    }
  ];

  const renderRoutes = (routes) => (routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const RouteWrapper = route.protected ? SecureRoute : Route;

          return (
            <RouteWrapper
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes
                    ? renderRoutes(route.routes)
                      : <Component {...props} />}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : '');

  const Routes = () => {

    const history = useHistory();
    const onAuthRequired = () => {
      history.push('/login');
    };
  
    const oktaAuth = new OktaAuth({
      issuer: process.env.REACT_APP_AUTH_DISCOVERY_URI,
      clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
      redirectUri: window.location.origin + '/login/callback',
      onAuthRequired: onAuthRequired,
      pkce: true
    });
  
    const restoreOriginalUri = async (_, originalUri) => {
      history.replace(toRelativeUrl('http://localhost:3000/dashboard', window.location.origin));
    }
    
    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            {renderRoutes(routesConfig)}
        </Security>
    )
  }
  export default Routes;