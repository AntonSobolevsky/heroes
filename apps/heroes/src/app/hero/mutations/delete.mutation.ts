import gql from "graphql-tag";

const mutation = gql`
  mutation delete_hero($id: ID!) {
    remove(id: $id) {
      _id
    }
  }
`;

const field = 'remove';

export const deleteMutation = {
  mutation,
  field
}
