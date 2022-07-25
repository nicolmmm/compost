const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    userName: String!
    email: String!
    password: String!
    phoneNumber: String!
    thumbsUp: Int
    thumbsDown: Int
  }

  type Station {
    _id: ID
    stationName: String!
    stationDescription: String!
    streetNumber: String!
    street: String!
    city: String!
    postCode: Int!
    acceptingWaste: Boolean
    distributingSoil: Boolean
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    stations: [Station]!
    stationByPostCode(queryPostCode: Int!): [Station]!
  }

  type Mutation {
    addStation(
      stationName: String!
      stationDescription: String!
      streetNumber: String!
      street: String!
      city: String!
      postCode: Int!
    ): Station
    addUser(
      userName: String!
      email: String!
      password: String!
      phoneNumber: String!
    ): User
    removeUser(userId: ID!): User
    incrementThumbsUp(userId: ID!): User
    incrementThumbsDown(userId: ID!): User
  }
`;

module.exports = typeDefs;
