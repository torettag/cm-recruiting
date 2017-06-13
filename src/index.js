import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import cookie from 'react-cookie';
import ga from 'react-ga';
import qs from 'query-string';
import moment from 'moment';

import epi from './services/epi';

import Home from './components/Home';

import councilMemberReducer from './reducers/councilMember';
import referralsReducer from './reducers/referrals';


//setup reducers
const reducers = combineReducers({
  councilMember: councilMemberReducer,
  referrals: referralsReducer
});

// Create a history
const history = createHistory()

// Build the middleware
const middleware = routerMiddleware(history)


//store setup
const store = createStore(
  combineReducers({
    reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)


//App Load
let params = qs.parse(window.location.search);

if (process.env.REACT_APP_GA)
   ga.initialize('UA-100969534-1',{ debug: true });

//for local dev
if (params.jwtcookie)
  cookie.save('jwt', params.jwtcookie, {expires: moment().add(30,'d').toDate()});

//Go get who is logged in and all shared info
Promise.all(
  [new epi().get('cm/getCouncilMember.mustache'), new epi().get('referral/getReferral.mustache') ]
)
.then( (results) => {
  let cm = results[0][0];
  let referrals = results[1];
  if (cm) {
    store.dispatch({type:"setCouncilMember",value: cm});

    store.dispatch({type:"setReferrals",value: referrals});

    //once info received, render the app
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
         <App>
            <Route path="/" component={Home}/>
          </App>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  }
  else
    console.log('User not found');
});




registerServiceWorker();
