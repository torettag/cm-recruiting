import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'


import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import cookie from 'react-cookie';
import ga from 'react-ga';
// import qs from 'query-string';
import moment from 'moment';

import epi from './services/epi';

import Home from './components/Home';
import Jobs from './components/Jobs';
import Recruits from './components/Recruits';


import councilMemberReducer from './reducers/councilMember';
import referralsReducer from './reducers/referrals';
import appSettingsReducer from './reducers/appSettings';


//setup reducers
const reducers = combineReducers({
  councilMember: councilMemberReducer,
  referrals: referralsReducer,
  appSettings: appSettingsReducer
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
//parse query string for appsettings
let urlParams = new URLSearchParams(window.location.search);

if (process.env.REACT_APP_GA)
   ga.initialize('UA-100969534-1',{ debug: true });

//for local dev
if (urlParams.get('jwtcookie'))
  cookie.save('jwt', urlParams.get('jwtcookie'), {expires: moment().add(30,'d').toDate()});

if (!!urlParams.get('focusMode'))
  store.dispatch({type:"SET_FOCUS_MODE",value: true});

//set redirect token to props to be sent back after thank you.
store.dispatch({type:"SET_REDIRECT_TOKEN",value: urlParams.get('redirectToken')});

if (urlParams.get('redirectUrl'))
  store.dispatch({type:"SET_REDIRECT_URL",value: decodeURIComponent(urlParams.get('redirectUrl'))});

store.dispatch({type:"SET_JWT_TOKEN",value: urlParams.get('jwt') || cookie.load('jwt') });


//Go get who is logged in and all shared info
Promise.all(
  [
    new epi().get('cm/getCouncilMember.mustache'), 
    new epi().post('referral/getReferral.mustache', { createdAfter: moment().subtract(6, 'months')  }), 
    new epi().post('referral/getActivity.mustache', { createdAfter: moment().subtract(6, 'months')  }) 
  ]
)
.then( (results) => {
  let cm = results[0][0];
  let referrals = results[1];
  let activity = results[2];
  if (cm) {
    store.dispatch({type:"setCouncilMember",value: cm});
    store.dispatch({type:"setReferrals",value: referrals});
    store.dispatch({type:"setActivity",value: activity});

    //once info received, render the app
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path="/jobs" component={Jobs}/>
              <Route exact path="/recruits" component={Recruits}/>
            </Switch>
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
