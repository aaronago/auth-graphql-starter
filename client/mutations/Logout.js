import gql from 'graphql-tag';

const logout = gql`
  mutation {
    logout {
      id
    }
}
`;

export default logout;
