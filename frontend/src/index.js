import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import jwt_decode from 'jwt-decode';
import { logout } from './store/session';

let store;


if (localStorage.jwtToken){
  const decodedUser = jwt_decode(localStorage.jwtToken)
  const preloadedState = {session: {user: decodedUser}};
  store = configureStore(preloadedState);
  const currentTine = Date.now()/1000;
  if (decodedUser.exp < currentTime) {
    store.dipatch(logout());
    window.location.href = '/login';
  } 
} else {
 store = configureStore({})
}





const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  )
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
