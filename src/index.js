import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

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


//setup reducers
const reducers = combineReducers({
  councilMember: councilMemberReducer
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
   ga.initialize('',{ debug: true });

//for local dev
if (params.jwtcookie)
  cookie.save('jwt', params.jwtcookie, {expires: moment().add(30,'d').toDate()});

//Go get who is logged in
new epi().get('cm/getCouncilMember.mustache')
.then( (cmResult) => {
  let cm = cmResult;
  if (cm) {
    cm = cm[0];
    store.dispatch({type:"setCouncilMember",value: cm});
  }
});


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

registerServiceWorker();