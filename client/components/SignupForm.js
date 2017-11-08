import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import { hashHistory } from 'react-router';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
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
        <h3>Sign Up</h3>
        <AuthForm onSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}
export default graphql(query)(graphql(mutation)(SignupForm));
