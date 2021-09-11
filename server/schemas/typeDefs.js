const { gql } = require('apollo-server-express');

// $$$$$------
const typeDefs = gql`

type User {
  _id: ID
  name: String
  email: String
  parkCount: Int
  password: String
  savedParks: [Park]
}

type Park {
  _id: ID
  parkId: String
  parkName: String
  description: String
  image: String
}

type Auth {
  token: ID!
  user: User
}

input ParkInput {
  parkId: String
  parkName: String
  description: String
  image: String
}

type Query {
  me(name: String!): User
}

type Mutation {
  addUser(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  savePark(input: ParkInput): Park
  removePark(userId: ID!, parkId: ID!): User
}
`;

// $$$$$------
// const typeDefs = gql`
// type Park {
//   _id: ID
//   parkId: String
//   parkName: String
//   description: String
//   image: String
// }

// type User {
//   _id: ID
//   name: String
//   email: String
//   parkCount: Int
//   password: String
//   savedParks: [Park]
// }

// type Auth {
//   token: ID!
//   user: User
// }

// input ParkInput {
//   parkId: String
//   parkName: String
//   description: String
//   image: String
// }

// type Query {
//   me(name: String!): User
// }

// type Mutation {
//   addUser(name: String!, email: String!, password: String!): Auth
//   login(email: String!, password: String!): Auth
//   savePark(input: ParkInput): User
//   removePark(userId: ID!, parkId: ID!): User
// }
// `;

module.exports = typeDefs;
