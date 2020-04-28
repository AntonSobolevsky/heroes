import gql from "graphql-tag";

const mutation = gql`
  mutation update_hero($input: UpdateHeroInput!) {
    update(input: $input) {
      _id
      nickname
      real_name
      origin_description
      superpowers
      catch_phrase
    }
  }
`;

const field = 'update';

export const updateMutation = {
  mutation,
  field
}
