import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    savedParks {
      parkCode
      parkName
      description
      image
      link
    }
  }
}
`;
