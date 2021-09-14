import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
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

// export const QUERY_PARKS = gql`
//   query getParks {
//     parks {
//       _id
//       parkId
//       parkName
//       description
//       image
//     }
//   }
// `;