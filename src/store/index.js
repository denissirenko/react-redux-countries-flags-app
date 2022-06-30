import axios from 'axios';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';
import * as api from '../config';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(
      thunk.withExtraArgument({
        client: axios,
        api,
      }),
    ),
  ),
);
