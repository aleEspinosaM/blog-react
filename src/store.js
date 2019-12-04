
import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'

import { promiseMiddleware, localStorageMiddleware } from './middleware';

import home from '../src/reducers/home';
import article from '../src/reducers/article';
import common from '../src/reducers/common';
import auth from '../src/reducers/auth';
import settings from '../src/reducers/settings';
import articleList from '../src/reducers/articleList';
import profile from '../src/reducers/profile';

const reducer = combineReducers({
  home,
  common,
  auth,
  article,
  settings,
  articleList,
  profile
});
const store = createStore(reducer, applyMiddleware(promiseMiddleware,logger,localStorageMiddleware ));

export default store;