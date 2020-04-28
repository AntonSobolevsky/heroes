import gql from "graphql-tag";

const query = gql`{
  pageCount
}`;

const field = 'pageCount';

export const pageCountQuery = {
  query,
  field
}
