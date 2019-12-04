import App from './components/App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from './store';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components//Register';
import Settings from './components/Settings/Settings';
import Article from './components/Article/index';
import Profile from './components/Profile/Profile';
import ProfileFavorites from './components/Profile/ProfileFavorites';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="settings" component={Settings} />
        <Route path="article/:id" component={Article} />
        <Route path="@:username" component={Profile} />
        <Route path="@:username/favorites" component={ProfileFavorites} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
