import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    name
    email
    savedParks {
      _id
      parkId
      parkName
      description
      image
    }
  }
}
`;