import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import ListErrors from '../ListErrors';
import agent from '../../agent';
import {SETTINGS_SAVED, LOGOUT} from '../../constants/settings';
import SettingsForm from './SettingsForm';

class Settings extends Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors} />

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    ...state.settings,
    currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT }),
    onSubmitForm: user =>
      dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) })
})

export default connect(mapStateToProps,mapDispatchToProps)(Settings);