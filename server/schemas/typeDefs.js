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
    ownsStations: [Station]
    savedStations: [Station]
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
    owner: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    userTwo(userId: ID!): User
    stations: [Station]!

    singleStation(stationId: ID!): Station
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
      acceptingWaste: Boolean
      distributingSoil: Boolean
    ): Station

    addUser(
      userName: String!
      email: String!
      password: String!
      phoneNumber: String!
    ): Auth

    saveStation(stationId: ID!): User

    login(email: String!, password: String!): Auth

    removeUser(userId: ID!): User

    removeSavedStation(stationId: ID!): User

    removeStation(stationId: ID!): Station
    incrementThumbsUp(userId: ID!): User
    incrementThumbsDown(userId: ID!): User
  }
`;

module.exports = typeDefs;
