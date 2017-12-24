import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from './reducers';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import history from './history';
var combinedReducers = combineReducers(
    {
        ...reducers,
        router: routerReducer
    }
)


const middleware = routerMiddleware(history)
const store = createStore(
    combinedReducers,
    {},
    compose(
        applyMiddleware(middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : state => state
    )
);

export { store as default }
                     