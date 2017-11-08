import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  handleSubmit({ email, password }) {
    this.setState({ err: '' })
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(e => e.message);
      this.setState({ errors })
    })
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}
export default graphql(query)(graphql(mutation)(LoginForm));
