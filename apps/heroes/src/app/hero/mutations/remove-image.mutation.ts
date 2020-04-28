import gql from "graphql-tag";

const mutation = gql`
  mutation remove_picture($heroId: ID!, $id: ID!) {
    removePicture(heroId: $heroId, id: $id) {
      _id
      nickname
      images {
        _id
        filename
      }
    }
  }
`;

const field = 'removePicture';

export const removeImageMutation = {
  mutation,
  field
}
