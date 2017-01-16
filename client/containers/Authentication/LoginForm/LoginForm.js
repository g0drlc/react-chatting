import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';

import { clearSubmitErrors, setLoginSubmitError, handleLoginSuccess } from '../../../redux/actions/auth';
import { LoginForm } from '../../../components';
import loginMutation from './login.graphql';

@connect(
  (state) => ({
    submitError: (state.auth && state.auth.loginSubmitError) || null,
  })
)
@graphql(loginMutation, {
  props: ({ mutate }) => ({
    submitLogin: ({ username, password }) => mutate({ variables: { username, password } }),
  }),
})
@reduxForm({
  form: 'login'
})
export default class LoginFormContainer extends Component {
  async onSubmit({ username, password }) {
    const { dispatch, submitLogin } = this.props;
    dispatch(clearSubmitErrors());
    const { data: { loginAsUser } } = await submitLogin({ username, password });
    if (loginAsUser.error) {
      dispatch(setLoginSubmitError(loginAsUser.error));
    } else {
      dispatch(handleLoginSuccess(loginAsUser));
    }
  }

  render() {
    const { handleSubmit, pristine, submitError, submitting } = this.props;
    return (
      <LoginForm
        pristine={pristine}
        submitError={submitError}
        submitting={submitting}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      />
    );
  }
}

LoginFormContainer.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitError: PropTypes.string,
  submitLogin: PropTypes.func,
  submitting: PropTypes.bool,
};
