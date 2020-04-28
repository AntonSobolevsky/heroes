import gql from "graphql-tag";

const mutation = gql`
  mutation create_hero($input: CreateHeroInput!) {
    create(input: $input) {
      _id
      nickname
    }
  }
`;

const field = 'create';

export const createMutation = {
  mutation,
  field
}
