import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


import Header from './Header';
// import Home from './Home/Home';
import agent from '../agent';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.redirectTo) {
      browserHistory.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  };

  
  componentWillMount() {
    const token  = window.localStorage.getItem('jwt');
    if(token){
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  
  
  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          {this.props.children}
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch =>({
  onRedirect: () =>
    dispatch({type: 'REDIRECT'}),
  onLoad: (payload, token) => 
    dispatch({type: 'APP_LOAD', payload, token })  
});

export default connect(mapStateToProps, mapDispatchToProps)(App)