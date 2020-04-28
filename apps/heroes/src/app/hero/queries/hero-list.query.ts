import gql from "graphql-tag";

const query = gql`
  query get_heroes($page: Int) {
    heroes(page: $page) {
      _id
      nickname
      images {
        _id
        filename
      }
    }
  }
`;

const field = 'heroes';

export const heroListQuery = {
  query,
  field
}
