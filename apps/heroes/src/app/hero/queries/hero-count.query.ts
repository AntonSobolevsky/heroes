import gql from "graphql-tag";

const query = gql`{
  heroesCount
}`;

const field = 'heroesCount';

export const heroesCountQuery = {
  query,
  field
}
