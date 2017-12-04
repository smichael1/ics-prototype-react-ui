import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';


import { reduxWebsocketMiddleware } from './websockets';


const socketMiddleware = reduxWebsocketMiddleware("ws://localhost:9000/ws");

//const middleware = applyMiddleware(socketMiddleware);

//const store = createStore(reducers, middleware);





const createStoreWithMiddleware = applyMiddleware(ReduxPromise, socketMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container-fluid'));
