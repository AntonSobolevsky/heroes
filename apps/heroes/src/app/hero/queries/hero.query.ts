import gql from "graphql-tag";

const query = gql`
  query get_hero($id: ID!) {
    hero(id: $id) {
      _id
      nickname
      real_name
      origin_description
      superpowers
      catch_phrase
      images {
        _id
        filename
      }
    }
  }
`;

const field = 'hero';

export const heroQuery = {
  query,
  field
}
