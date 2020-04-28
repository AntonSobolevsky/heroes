import gql from "graphql-tag";

const mutation = gql`
  mutation UploadPicture($id: ID!, $picture: Upload!) {
    uploadPicture(id: $id, picture: $picture) {
      images {
        filename
        _id
      }
    }
  }
`;

const field = 'uploadPicture';

export const uploadMutation = {
  mutation,
  field
}
