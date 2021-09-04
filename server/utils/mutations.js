import { gql } from '@apollo/client';

export const LOGIN = gql`
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
    $userName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      userName: $firstName
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

export const SAVE_PARK = gql`
  mutation savePark($input: ParkInput!) {
    savePark(input: $input) {
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

export const REMOVE_PARK = gql`
  mutation removePark($parkCode: String!) {
    removePark(parkCode: $parkCode) {
      _id
      username
      savedParks {
        parkCode 
        name
      }
    }
  }
`;