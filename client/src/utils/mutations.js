import { gql } from "@apollo/client";

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
  mutation addUser($name: String!, $password: String!, $email: String!) {
    addUser(name: $name, password: $password, email: $email) {
      user {
        _id
        name
        email
        savedParks {
          _id
          parkId
          parkName
          description
          image
          latitude
          longitude
        }
      }
      token
    }
  }
`;

export const SAVE_PARK = gql`
  mutation savePark($input: ParkInput!) {
    savePark(input: $input) {
      _id
      parkId
      parkName
      description
      image
      latitude
      longitude
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
