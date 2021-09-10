import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;


// export const ADD_USER = gql`
//   mutation addUser($name: String!, $email: String!, $password: String!) {
//     addUser(name: $name, email: $email, password: $password) {
//       token
//     }
//   }
// `;


// export const LOGIN_USER = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;

export const SAVE_PARK = gql`
  mutation savePark($input: ParkInput!) {
    savePark(input: $input) {
      _id
      name
      email
      savedParks {
        parkId
        parkName
        description
        image
      }
    }
  }
`;

export const REMOVE_PARK = gql`
  mutation removePark($parkId: String!) {
    removePark(parkId: $parkId) {
      _id
      name
      savedParks {
        parkName 
      }
    }
  }
`;