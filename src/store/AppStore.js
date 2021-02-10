import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createHistory();
  const middleware = [
    thunk,
    routerMiddleware(history)
  ]
  
 const enhancer= composeWithDevTools(
    applyMiddleware(...middleware)
  )

export const AppStore = createStore(connectRouter(history)(rootReducer), enhancer);
